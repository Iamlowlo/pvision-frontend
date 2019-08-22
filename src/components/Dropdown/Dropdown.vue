<template>
  <div class="dropdown">
    <div
      v-if="isDesktop"
      class="dropdown__desktop"
      :class="[isOpen ? 'dropdown__desktop--open' : '']"
      @click.stop="toggleDropdown"
    >
      <span class="dropdown__desktop__selected-option">{{
        selectedOptionMsg
      }}</span>
      <ul v-if="isOpen" class="dropdown__desktop__option-list">
        <li
          class="dropdown__desktop__option"
          v-for="(option, key) of options"
          :key="`dropdown-option-${key}`"
          @click="() => onSelectOption(option.value)"
        >
          {{ option.msg }}
        </li>
      </ul>
    </div>
    <select
      v-else
      name="dropdown"
      class="dropdown__mobile"
      @change="$event => onSelectOption($event.target.value)"
    >
      <option value="" disabled selected>{{ defaultMsg }}</option>
      <option
        v-for="(option, key) of options"
        :value="option.value"
        :key="`dropdown-option-${key}`"
        >{{ option.msg }}</option
      >
    </select>
    <i class="icon-chevron-down dropdown__arrow"
       :class="[isOpen ? 'dropdown__arrow--open' : '']"
       @click.stop="toggleDropdown"></i>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  data: () => ({
    selectedOptionMsg: '',
    isOpen: false
  }),
  props: {
    isDesktop: {
      type: Boolean,
      default: false
    },
    defaultMsg: {
      type: String,
      default: 'Transaction Type'
    },
    options: {
      type: Array,
      default: () => [
        { msg: 'Payment', value: 'payment' },
        { msg: 'Credit', value: 'credit' },
        { msg: 'Authorize', value: 'authorize' }
      ]
    }
  },
  methods: {
    onSelectOption: function(optionValue) {
      const selectedOption = this.options.find(
        option => option.value === optionValue
      );
      this.selectedOptionMsg = selectedOption.msg;
      this.$emit('onSelectOption', selectedOption);
    },
    clickAway: function() {
      this.isOpen = false;
      window.removeEventListener('click', this.clickAway)
    },
    toggleDropdown: function() {
      document.body.click();
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        window.addEventListener('click', this.clickAway)
      }
    }
  },
  mounted() {
    this.selectedOptionMsg = this.defaultMsg;
  }
};
</script>

<style lang="scss" scoped src="./Dropdown.scss"></style>
