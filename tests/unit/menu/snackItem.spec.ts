import { VueWrapper, shallowMount } from "@vue/test-utils";
import SnackItem from "@/components/SnackItem.vue";

describe("MenuItem.vue", () => {
  let wrapper: VueWrapper;

  /* Helper Functions */
  const findSnacks = () => wrapper.findAll(".snack");
  const findText = () => wrapper.text();

  /* Component Factory*/
  function createComponent(args: object) {
    wrapper = shallowMount(SnackItem, args);
  }

  /* Destroy the component after each test for test isolation */
  afterEach(() => {
    wrapper.unmount();
  });

  /* Lunch Item Tests*/
  it("renders the snacks in the list", () => {
    createComponent({ props: { snacks: ["test1", "test2"] } });
    // there should be two snacks
    expect(findSnacks().length).toEqual(2);
    // the names should match those passed in the props
    expect(findText()).toContain("test1");
    expect(findText()).toContain("test2");
    // the component should add a pretzel emoji
    expect(findText()).toContain("\u{1F968}");
  });

  it("does not render the snacks if list is empty", () => {
    createComponent({ props: { snacks: [] } });
    // there should be no snacks present
    expect(findSnacks().length).toEqual(0);
    // there should be no emoji present
    expect(findText()).not.toContain("\u{1F968}");
  });
});
