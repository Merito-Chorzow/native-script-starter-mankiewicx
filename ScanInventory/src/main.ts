import "@nativescript/core/globals";
import "./polyfills";

import {
  bootstrapApplication,
  provideNativeScriptRouter,
  runNativeScriptAngularApp,
  provideNativeScriptHttpClient,
} from "@nativescript/angular";
import { provideZonelessChangeDetection } from "@angular/core";
import { routes } from "./app/app.routes";
import { AppComponent } from "./app/app.component";

runNativeScriptAngularApp({
  appModuleBootstrap: () => {
    return bootstrapApplication(AppComponent, {
      providers: [
        provideZonelessChangeDetection(),
        provideNativeScriptRouter(routes),
        provideNativeScriptHttpClient(),
      ],
    });
  },
});
