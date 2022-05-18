/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect'
import {render, within} from '@testing-library/svelte'
import Navigation from '../src/Navigation.svelte'
import userEvent from "@testing-library/user-event";

test('Check render', () => {
  const {getByTestId} = render(Navigation, {navigationItems: [], title: "", type: "sidebar"});
  expect(getByTestId('sidebar')).toBeInTheDocument();
});

test('Should have one navigation link nœavigation items', () => {
  const {getByTestId, getAllByText} = render(Navigation, {
    navigationItems: [{
      hrefOrCallback: "/Madrid",
      name: "go to madrid"
    }],
    title: "HomePage",
    type: "sidebar"
  });

  expect(getAllByText("HomePage")).toHaveLength(2)

  const sideBar = getByTestId('sidebar');
  expect(within(sideBar).getByText("go to madrid")).toBeInTheDocument()
  expect(within(sideBar).getByText("go to madrid").href).toEqual('http://localhost/Madrid')
})

test('Should have one callback link in navigation items', () => {
  const cb = jest.fn()
  const {getByTestId, getAllByText} = render(Navigation, {
    navigationItems: [{
      hrefOrCallback: cb,
      name: "with callback"
    }],
    title: "HomePage",
    type: "sidebar"
  });

  expect(getAllByText("HomePage")).toHaveLength(2)

  const sideBar = getByTestId('sidebar');
  let menuItem = within(sideBar).getByText("with callback");
  expect(menuItem.href).toEqual('http://localhost/#')
  expect(menuItem).toBeInTheDocument()
  userEvent.click(menuItem)
  expect(cb).toHaveBeenCalled()
})
