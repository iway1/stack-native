/**
 * The output of typedoc-docausurus-plugin is pretty horrendous we
 * got to do a lot of manual processing here. Ideally we never have to touch this script
 */
import { Application, TSConfigReader, TypeDocReader } from "typedoc";
import fs from "node:fs";
import path from "node:path";
import fsExtra from "fs-extra";

const base = "../react-native/src";
const items: {
  dir: string;
  title: string;
}[] = [
  { dir: "components", title: "Components" },
  { dir: "hooks", title: "Hooks" },
];
const startLineSearchString = "Module:";

function getFiles(dir: string): string[] {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files);
}

function commonProcessing(string: string, fileName: string) {
  const startIndex = string.indexOf("\n# ");
  return string.slice(startIndex).replace("# Module: ", "# ").trim();
}

function processDocFile(fileName: string, fileString: string): string {
  let r = commonProcessing(fileString, fileName);
  let titleLine = r.slice(0, r.indexOf("\n") + 1).slice(2);

  // remove folder names:
  const split = titleLine.split("/");
  titleLine = split[split.length - 1];

  const functionLineString = "**";
  const functionStartIndex = r.indexOf(functionLineString);

  return titleLine + r.slice(functionStartIndex).trim();
}

function rmDirIfExists(dir: string) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true });
}

function rmFileIfExists(file: string) {
  if (fs.existsSync(file)) fs.rmSync(file);
}

function createOutFile(fName: string, outputString: string) {
  // Calculate the final location based on output
  const split = fName.split("/");
  const currentFileName = split[split.length - 1];
  const newPathRight = currentFileName.split("_");
  fsExtra.ensureDirSync(
    split
      .slice(0, split.length - 1)
      .concat(newPathRight.slice(0, newPathRight.length - 1))
      .join("/")
  );

  fs.writeFileSync(
    split
      .slice(0, split.length - 1)
      .concat(newPathRight)
      .join("/"),
    outputString
  );
}

async function run() {
  if (fs.existsSync("docs/Library"))
    fs.rmSync("docs/Library", { recursive: true });
  for (const { dir, title } of items) {
    const dirPath = base + "/" + dir;

    const allTsFiles = getFiles(dirPath).filter(
      (e) =>
        !e.includes(`${base}/index.tsx`) &&
        !e.includes(`${base}/index.ts`) &&
        (e.endsWith("tsx") || e.endsWith("ts"))
    );
    if (
      allTsFiles.some((e) => {
        const s = e.split("/");
        const fName = s[s.length - 1];
        return fName.includes("_");
      })
    ) {
      throw new Error("File names cannot have underscores.");
    }
    const app = new Application();
    app.options.addReader(new TSConfigReader());
    app.options.addReader(new TypeDocReader());
    app.bootstrap({
      entryPoints: allTsFiles,
      tsconfig: "../react-native/tsconfig.json",
      entryPointStrategy: "Resolve",
      plugin: ["typedoc-plugin-markdown"],
    });

    const project = app.convert();
    const outDir = "docs/Library/" + (dir[0].toUpperCase() + dir.slice(1));
    if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true });

    if (project) {
      await app.generateDocs(project, outDir);
      rmFileIfExists(`${outDir}/.nojekyll`);
      rmFileIfExists(`${outDir}/README.md`);
      rmFileIfExists(`${outDir}/modules.md`);
      // Might want an index later idk
      // const modulesFileString = processIndexFileString(
      //     fs.readFileSync(`${outDir}/modules.md`).toString(),
      //     title,
      //     outDir + "/index.md"
      // );
      // fs.writeFileSync(`${outDir}/index.md`, modulesFileString);
      if (!fs.existsSync(`${outDir}/modules`)) continue;
      const files = getFiles(`${outDir}/modules`);

      for (const file of files) {
        const fileString = fs.readFileSync(file, "utf-8").toString();
        fs.rmSync(file);

        const split = file.split("/");
        const newFname = split
          .slice(0, split.length - 2)
          .concat([split[split.length - 1]])
          .join("/");
        createOutFile(newFname, processDocFile(file, fileString));
      }
      rmDirIfExists(`${outDir}/modules`);
    }
    rmFileIfExists(`${outDir}/index.md`);
  }
}

run();
