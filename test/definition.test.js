import { NavigationItem } from '../src/definition'

test('Check NavigationItem.isButton ', () => {
  expect(new NavigationItem('Hello', 'www.hello.fr').isButton()).toBeFalsy();
  expect(new NavigationItem('Hello', ()=> '').isButton()).toBeTruthy();
});