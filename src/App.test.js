import renderer from "react-test-renderer";
import App from "./App";

it("changes the class when hovered", () => {
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
