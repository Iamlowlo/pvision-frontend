<template>
  <div class="dropdown">
    <div
      v-if="isDesktop"
      class="dropdown__desktop"
      :class="[isOpen ? 'dropdown__desktop--open' : '']"
      @click.stop="toggleDropdown"
    >
      <span class="dropdown__desktop__selected-option">{{
        selectedOption.msg
      }}</span>
      <ul v-if="isOpen" class="dropdown__desktop__option-list">
        <li
          class="dropdown__desktop__option"
          v-for="(option, key) of options"
          :key="`dropdown-option-${key}-${option.value}`"
          @click="() => onSelectOption(option.value)"
        >
          {{ option.msg }}
        </li>
      </ul>
    </div>
    <select
      v-else
      ref="dropdown__mobile"
      name="dropdown"
      class="dropdown__mobile"
      :value="selectedOption.value"
      @change="$event => onSelectOption($event.target.value)"
    >
      <template v-for="(option, key) of options">
        <option
          :value="option.value"
          :key="`dropdown-option-${key}`"
          :selected="key === 0"
        >{{ option.msg }}</option
        >
      </template>
    </select>
    <i
      class="icon-chevron-down dropdown__arrow"
      :class="[isOpen && isDesktop ? 'dropdown__arrow--open' : '']"
      @click.stop="toggleDropdown"
    ></i>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  data: () => ({
    selectedOption: {},
    isOpen: false,
    isMounted: false
  }),
  props: {
    isDesktop: {
      type: Boolean,
      default: false
    },
    defaultMsg: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onSelectOption: function(optionValue) {
      this.selectedOption = this.options.find(
        option => option.value === optionValue
      );
      this.$emit('onSelectOption', this.selectedOption);
    },
    clickAway: function() {
      this.isOpen = false;
      window.removeEventListener('click', this.clickAway);
    },
    toggleDropdown: function() {
      this.isOpen = !this.isOpen;
      document.body.click();
      const dropdownMobileRef = this.$refs['dropdown__mobile'];
      if (dropdownMobileRef) {
        console.log('dropdownMobileRef', dropdownMobileRef)
        dropdownMobileRef.click();
      }
      if (this.isOpen) {
        window.addEventListener('click', this.clickAway);
      }
    }
  },
  mounted() {
    this.selectedOption = this.defaultMsg
      ? { msg: this.defaultMsg }
      : this.options[0];
    this.isMounted = true;
  }
};
</script>

<style lang="scss" scoped src="./Dropdown.scss"></style>
