/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect'
import { render, within } from '@testing-library/svelte'
import SideBar from '../src/SideBar.svelte'

test('Check render', () => {
  const { getByTestId } = render(SideBar, { navigationItems: [] });
  expect(getByTestId('sidebar')).toBeInTheDocument();
});

test('Should have one navigation link navigation items', () => {
  const { getByTestId } = render(SideBar, {
    navigationItems: [{
      destination: "/Madrid",
      name: "go to madrid"
    }]
  });

  const sideBar = getByTestId('sidebar');
  expect(within(sideBar).getByText("go to madrid")).toBeInTheDocument()
  expect(within(sideBar).queryByText("go to hell")).toBeNull()
})
