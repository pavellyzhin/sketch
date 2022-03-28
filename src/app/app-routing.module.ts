import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SketchComponent } from './sketch/sketch.component';


const routes: Routes = [{path: '', component:AppComponent, children:[
  {path: '', component: MainComponent},
  {path: 'sketch', component: SketchComponent},
  {path: 'about', component: AboutComponent}
]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
