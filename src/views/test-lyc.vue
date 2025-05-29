<template>
  <div class="test">
    <a-typography :style="{ marginTop: '-40px' }">
      <a-typography-title> Design system </a-typography-title>
      <a-typography-paragraph>
        A design is a plan or specification for the construction of an object or
        system or for the implementation of an activity or process, or the
        result of that plan or specification in the form of a prototype, product
        or process. The verb to design expresses the process of developing a
        design.
      </a-typography-paragraph>
      <a-typography-paragraph>
        In some cases, the direct construction of an object without an explicit
        prior plan (such as in craftwork, some engineering, coding, and graphic
        design) may also be considered
        <a-typography-text bold>to be a design activity.</a-typography-text>
      </a-typography-paragraph>
      <a-typography-title :heading="2">ArcoDesign</a-typography-title>
      <a-typography-paragraph>
        The ArcoDesign component library defines a set of default particle
        variables, and a custom theme is to
        <a-typography-text mark>customize</a-typography-text> and
        <a-typography-text underline>overwrite</a-typography-text> this variable
        list.
      </a-typography-paragraph>
      <a-typography-paragraph blockquote>
        A design is a plan or specification for the construction of an object or
        system or for the implementation of an activity or process, or the
        result of that plan or specification in the form of a
        <a-typography-text code>prototype</a-typography-text>,
        <a-typography-text code>product</a-typography-text> or
        <a-typography-text code>process</a-typography-text>. The verb to design
        expresses the process of developing a design.
      </a-typography-paragraph>
      <a-typography-paragraph mark underline delete
        >A design is a plan or specification for the construction of an object
        or system or for the implementation of an activity or
        process.</a-typography-paragraph
      >
      <a-typography-paragraph>
        <ul>
          <li>
            Architectural blueprints
            <ul>
              <li>Architectural blueprints</li>
            </ul>
          </li>
          <li>Engineering drawings</li>
          <li>Business processes</li>
        </ul>
      </a-typography-paragraph>
      <a-typography-paragraph>
        <ol>
          <li>Architectural blueprints</li>
          <li>Engineering drawings</li>
          <li>Business processes</li>
        </ol>
      </a-typography-paragraph>
    </a-typography>
    <yc-typography :style="{ marginTop: '-40px' }">
      <yc-typography-title> Design system </yc-typography-title>
      <yc-typography-paragraph>
        A design is a plan or specification for the construction of an object or
        system or for the implementation of an activity or process, or the
        result of that plan or specification in the form of a prototype, product
        or process. The verb to design expresses the process of developing a
        design.
      </yc-typography-paragraph>
      <yc-typography-paragraph>
        In some cases, the direct construction of an object without an explicit
        prior plan (such as in craftwork, some engineering, coding, and graphic
        design) may also be considered
        <yc-typography-text bold>to be a design activity.</yc-typography-text>
      </yc-typography-paragraph>
      <yc-typography-title :heading="2">ArcoDesign</yc-typography-title>
      <yc-typography-paragraph>
        The ArcoDesign component library defines a set of default particle
        variables, and a custom theme is to
        <yc-typography-text mark>customize</yc-typography-text> and
        <yc-typography-text underline>overwrite</yc-typography-text> this
        variable list.
      </yc-typography-paragraph>
      <yc-typography-paragraph blockquote>
        A design is a plan or specification for the construction of an object or
        system or for the implementation of an activity or process, or the
        result of that plan or specification in the form of a
        <yc-typography-text code>prototype</yc-typography-text>,
        <yc-typography-text code>product</yc-typography-text> or
        <yc-typography-text code>process</yc-typography-text>. The verb to
        design expresses the process of developing a design.
      </yc-typography-paragraph>
      <yc-typography-paragraph mark underline delete
        >A design is a plan or specification for the construction of an object
        or system or for the implementation of an activity or
        process.</yc-typography-paragraph
      >
      <yc-typography-paragraph>
        <ul>
          <li>
            Architectural blueprints
            <ul>
              <li>Architectural blueprints</li>
            </ul>
          </li>
          <li>Engineering drawings</li>
          <li>Business processes</li>
        </ul>
      </yc-typography-paragraph>
      <yc-typography-paragraph>
        <ol>
          <li>Architectural blueprints</li>
          <li>Engineering drawings</li>
          <li>Business processes</li>
        </ol>
      </yc-typography-paragraph>
    </yc-typography>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const value = ref('312321');
</script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
