# Nutforms Project Motivation

## The stresses of user interface development

Developing user interface (UI) can be very tedious and error-prone.
It is estimated that UI consumes 48 % of your
application code and 50 % of the development time ([source](https://www.researchgate.net/profile/Richard_Kennard/publication/220376640_Towards_a_general_purpose_architecture_for_UI_generation/links/0fcfd4fcc4cac48bce000000.pdf)).
The UI then must reflect many concerns which are already
addressed in other layers of the system, e.g., model structure,
business rules and localization. Then, similar concerns
are shared between different parts of the UI, such as layouts
or widgets. Current approaches to UI development require
manual duplication of these concerns, leading to higher
complexity and error-proneness of your system.

## Aspect Oriented Programming

Aspect Oriented Programming (AOP) addresses such
concerns and calls them "aspects". The aspect is a
concern cutting across different components of your
system. AOP enables us to define aspect functionality
separately and then automatically weave it to every
place where it is required.

## Automatic form generation

Current web applications widely use forms as a
way for letting users manage their data. By
automatically generating the forms, we can achieve
code save and lower development time of UI.
However, the generated forms must adhere
to both static and dynamic context of your application.
Nutforms library provides such generation by
using AOP approach and letting you define
the aspects separately and then weave them
while automatically generating the form.
