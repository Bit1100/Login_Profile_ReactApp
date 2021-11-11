# Walk through of the Project

The project starts from home page having button in it and onclick on the same, it redirects to login page. THere, username and password are validated and once done, it redirects to the profile page. There, one can add/edit their details and upload his/her profile pic. The special thing in the profile page is that form get opened inside the modal. Form validation is applied on both login and profile page.

## Styling

SASS

## React Component Type

Functional Component with various hooks like useState(), useEffect(), useContext()

## Custom Hook

useInput() is the one that I used to cater the needs of onChange in form

## LocalStorage

Beautifully Used localStorage to hold the data permanently unless it's being manually deleted.

## State Management

Used Context API for data distribution across the components.

## Libraries Added

1. "react-icons" for icons
2. "react-toastify" for toast
3. "react-datepicker" for custom calender
4. "@tippy.js/react" for tooltips.
5. "react-spinners" for loader

## Miscellaneous

Regular Expression(RegEx), Form Validation, Form Handling with custom hook - useInput(), Modal Creation and termination with click on Overlay, and many more other concepts are in use.

## Best Practices

Constants are used rather than the magic numbers, files are well-organised meaning pages, components, context, custom hooks, images, styles and are in separate file making app structure clear to understand and scalable in nature.
