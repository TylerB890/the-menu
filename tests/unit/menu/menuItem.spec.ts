import { VueWrapper, shallowMount } from "@vue/test-utils";
import MenuItem from "@/components/MenuItem.vue";

describe("MenuItem.vue", () => {
  let wrapper: VueWrapper;

  // helper
  const findText = () => wrapper.text();

  // Component Factory
  function createComponent(args: object) {
    wrapper = shallowMount(MenuItem, args);
  }

  // Destroy component after each test for test isolation
  afterEach(() => {
    wrapper.unmount();
  });

  /* Lunch Item Tests*/
  it("renders the lunch_t item if present", () => {
    createComponent({ props: { mealDay: { meals: { lunch_t: "test" } } } });
    expect(findText()).toContain("\u{1F468} Lunch: test");
  });

  it("renders the lunch_a item if present", () => {
    createComponent({ props: { mealDay: { meals: { lunch_a: "test" } } } });
    expect(findText()).toContain("\u{1F469} Lunch: test");
  });

  it("renders the lunch item if present", () => {
    createComponent({ props: { mealDay: { meals: { lunch: "test" } } } });
    expect(findText()).toContain("\u{1F46B} Lunch: test");
  });

  /* Office Emoji Tests*/
  it("renders an office emoji if the lunch office item is present", () => {
    createComponent({
      props: { mealDay: { meals: { lunch_a_office: "test" } } },
    });
    expect(findText()).toContain("\u{1F3E2}");
  });

  it("renders an office emoji if the dinner office item is present", () => {
    createComponent({
      props: { mealDay: { meals: { dinner_a_office: "test" } } },
    });
    expect(findText()).toContain("\u{1F3E2}");
  });

  /* Dinner Tests*/
  it("renders the dinner_t item if present", () => {
    createComponent({ props: { mealDay: { meals: { dinner_t: "test" } } } });
    expect(findText()).toContain("\u{1F468} Dinner: test");
  });

  it("renders the dinner_a item if present", () => {
    createComponent({ props: { mealDay: { meals: { dinner_a: "test" } } } });
    expect(findText()).toContain("\u{1F469} Dinner: test");
  });

  it("renders a couple emoji if the dinner item is present", () => {
    createComponent({ props: { mealDay: { meals: { dinner: "test" } } } });
    expect(findText()).toContain("\u{1F46B} Dinner: test");
  });

  /* Misc Item Tests*/
  it("renders a misc item if the misc item is present", () => {
    createComponent({ props: { mealDay: { meals: { misc: "test" } } } });
    expect(findText()).toContain("\u{23F0} Misc: test");
  });

  /* Empty Day Tests */
  it("does not render line items if no meal data is present", () => {
    createComponent({ props: { mealDay: { meals: {} } } });
    /* Lunches */
    expect(findText()).not.toContain("\u{1F469} Lunch:");
    expect(findText()).not.toContain("\u{1F468} Lunch:");
    /* Dinners */
    expect(findText()).not.toContain("Dinner");
    expect(findText()).not.toContain("\u{1F469} Dinner:");
    /* Office */
    expect(findText()).not.toContain("\u{1F3E2}");
    /* Misc */
    expect(findText()).not.toContain("Misc");
  });
});
