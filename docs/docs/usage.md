# Usage Guide

This component library is "integrated" and "semi-headless". 

- Integrated: Many of the components are designed to be used with certain state management libraries
    - `<InfiniteFlatlist/>` uses `react-query`
    - `<TextField/>` uses `react-hook-form`
- Semi Headless:
    - This library is designed to be able to implement any design, but also implements some state transition animations under the hood to more easily achieve a great user experience. IE the `<TextField/>` component will, by default, animate between the focused and unfocused border color.

It handles a lot of the complexities and gotchas required when building out common components, but some of the core components provided will still require creating "wrapper components". IE the text field should
