This is a work in progress form library for svelte.

I built this after looking at other form construction methods and not wanting to have to build both an object for validating the form and the actual form itself. This feels like double handling to me.

All this one requires is the instantiation of a form_validator store using the `createFormValidator()` function. This is then passed to the form and any input within and everything else is done for you.