<template>
  <div class="dropdown">
    <div
      v-if="isDesktop"
      class="dropdown__desktop"
      @click="() => this.isOpen = !this.isOpen">
      <span class="dropdown__desktop__selected-option">{{selectedOptionMsg}}</span>
      <ul class="dropdown__desktop__option-list">
        <li
          class="dropdown__desktop__option"
          v-for="(option, key) of options"
          :key="`dropdown-option-${key}`"
          @click="() => onSelectOption(option.value)"
        >{{option.msg}}</li>
      </ul>
    </div>
    <select
      v-else
      name="dropdown"
      class="dropdown__mobile"
      @click="() => this.isOpen = !this.isOpen"
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
    <i class="icon-chevron-down dropdown__arrow"></i>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  data: () => ({
    selectedOptionMsg: '',
    mql: window.matchMedia('(min-width: 1281px)'),
    mqlHandler: e => {
      this.isDesktop = e.matches;
    },
    isDesktop: false,
    isOpen: false
  }),
  props: {
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
      const selectedOption = this.options.find(option => option.value === optionValue);
      this.selectedOptionMsg = selectedOption.msg;
      this.$emit(
        'onSelectOption',
        selectedOption
      );
    }
  },
  mounted() {
    this.selectedOptionMsg = this.defaultMsg;
    this.mql.addListener(this.mqlHandler);
  },
  beforeDestroy() {
    this.mql.removeListener(this.mqlHandler);
  }
};
</script>

<style lang="scss" scoped src="./Dropdown.scss"></style>
