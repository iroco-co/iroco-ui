/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect'
import { render, within } from '@testing-library/svelte'
import Navigation from '../src/Navigation.svelte'

test('Check render', () => {
  const { getByTestId } = render(Navigation, { navigationItems: [], title: "" });
  expect(getByTestId('sidebar')).toBeInTheDocument();
});

test('Should have one navigation link navigation items', () => {
  const { getByTestId, getAllByText } = render(Navigation, {
    navigationItems: [{
      destination: "/Madrid",
      name: "go to madrid"
    }],
    title : "HomePage"
  });

  expect(getAllByText("HomePage").length).toEqual(2)

  const sideBar = getByTestId('sidebar');
  expect(within(sideBar).getByText("go to madrid")).toBeInTheDocument()
  expect(within(sideBar).queryByText("go to hell")).toBeNull()
})
