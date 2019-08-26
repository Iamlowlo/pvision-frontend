<template>
  <div class="dropdown">
    <div
      v-if="isDesktop"
      class="dropdown__desktop"
      :class="[isOpen ? 'dropdown__desktop--open' : '']"
      @click.stop="toggleDropdown"
    >
      <span class="dropdown__desktop__selected-option" ref="dropdown__desktop__selected-option">{{
        selectedOption.msg
      }}</span>
      <transition name="slideDown" @enter="transitionEnter" @leave="transitionLeave">
        <div
          v-if="isOpen"
          ref="dropdown__desktop__option-container"
          class="dropdown__desktop__option-container">
          <ul class="dropdown__desktop__option-list">
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
      </transition>
    </div>
    <select
      v-else
      name="dropdown"
      class="dropdown__mobile"
      :value="selectedOption.value"
      @change="$event => onSelectOption($event.target.value)"
    >
      <option
        v-for="(option, key) of options"
        :value="option.value"
        :key="`dropdown-option-${key}`"
        :selected="key === 0"
      >{{ option.msg }}</option>
    </select>
    <i
      class="icon-chevron-down dropdown__arrow"
      :class="[isOpen && isDesktop ? 'dropdown__arrow--open' : '']"
      @click.stop="toggleDropdown"
    ></i>
  </div>
</template>

<script>
import { transitionEnter, transitionLeave } from "@/animations/slideDown";

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
    transitionEnter,
    transitionLeave,
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
      if (this.isOpen) {
        window.addEventListener('click', this.clickAway);
        this.$nextTick(function() {
          const optionContainer = this.$refs['dropdown__desktop__option-container'];
          optionContainer.style.paddingTop = `${this.$refs['dropdown__desktop__selected-option'].offsetHeight}px`;
        })
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
