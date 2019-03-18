import { Component } from '@angular/core';
import { ShoppingListPage } from '../shopping-list/shopping-list';
import { ReceipesPage } from '../receipes/receipes';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  slPage = ShoppingListPage
  recepiePage = ReceipesPage
}
