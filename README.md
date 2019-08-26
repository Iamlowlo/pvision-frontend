# Recruitment Challenges: Frontend Software Engineer

To complete the challenge it was needed to create a middleware node server with Express to work in dev mode. That means that build package will be calling to server directly from browser and if it's not deployed below same origin, a CORS failure will be shown and tha app won't be able torun properly.

We can run frontend and middleware separately in two instances or just call `npm run dev` which calls them at the same time. Just remember that it's required to kill both processes instead of one.

## Technologies used:
- Vue
- Sass
- Vuex
- Express

## Development info 
#### Components
Business logic free vue components which can be use in other context.

#####Dropdown
To offer device built in behaviour on mobile and tablet, this component renders a `<select>` on resolutions below 1024px.

Over that limit, a fake select built in with a `<ul>` is shown to users on desktop alike devices where no OS ui is affected and the requested look and feel can be achieved.

Beside that, a clickAway method is defined to close opened instance of the component if any part of the window recieves a click event. This eventListener is attached to window as soon as the open action occurs, and removed when clickAway is triggered back.

#####Responsive Table
According to the requested design, the project has a table that has to be done using the HTML tags for that purpose (`<table>`, `<tr>` & `<td>`).

As no mobile design was supplied and the info on a table like that can't be properly displayed on smaller devices, resolutions below 1024px will show a header-fixed horizontal tabbed table.

To achieve that, `<table>` element display property was set to `flex`, `<td>` to `block` and header row is positioned on the left, giving its width as padding-right to `<table>` tag.

#### Containers
Vue components with business logic, having access to see and modify the app store using Vuex.

#####Locale Selector
A simple component, but as its purpose is to change locale wherever it is instanced, and it has a connection to store to do it so, it's a container and not a plain component by definition.

It has defined as a data which locales should show. It could be retrieved from a service, but as this complete behaviour was not requested on the challenge and it will produce more code already explored, I decided to keep it simple for the challenge and keep it this way.

Active locale is received as a computed property from global module, and each locale shown triggers a mutation on that module to set it.

#####Transactions
This component is a route holder and has multiple connections with store. Gather all components required to complete the view and performs data mapping to match input contract to `ResponsiveTable` component.

This logic is set here instead of inside component or having it already prepared on store because, the first option binds business logic with an agnostic component and the second one ties this representation with the raw data recovered from service and further developments could be suffered because of that.

As soon as the component is mounted, a call to retrieve config data is performed. This data is a fake service call as long as a need for that kind of info was detected on development and no service was really available to retrieve that (to match brandID's fetched from service with actual names).

When this fake call promise is resolved, an action to retrieve data from the API with no filter added is performed. The reason to do that is to prepare the app and feed the available filters.

With each filter value change, a mutation and just that is triggered to store that on transactions module. Those filter active values are used on service call.

#### Vue Animations/Transitions
In some cases as Dropdown slideDown animation, a js logic is needed to apply a transition between states. For that reason Vue offers this logic where we can apply css styles and get some js hooks to handle that transformation.

In this case, as I see this code likely reusable, a js file with animation hooks was created inside animations folder to be used if any other component requires this animation to be performed.

#### Vuex Store
A module store structure eases to split concepts and maintenance. According to that, two different modules was created.

##### Global
Hold info relative to the main app, as active locale or active breakpoint

##### Transactions
Handles the info relative to transactions view/container

## Project setup
```
npm install
cd middleware && npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Runs middleware server on local environment to avoid CORS
```
npm run middle
```

### Runs serve and middleware tasks at the same time
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

