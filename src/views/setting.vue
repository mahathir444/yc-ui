<template>
  <div class="home-container">
    <!-- <div>
			<a-select :options="[1, 2, 3, 4, 5]">
				<template #prefix>
					<div class="form-prefix-text">测试</div>
				</template>
			</a-select>
		</div>
		<div>
			<a-input>
				<template #prefix>
					<div class="form-prefix-text">测试</div>
				</template>
			</a-input>
		</div>
		<a-radio />
		<a-checkbox />
		<a-button type="primary">测试</a-button>
		<a-link :hoverable="false">查看</a-link>
		<a-link>查看</a-link>
		<a-table draggable :columns="columns" :data="data" :row-selection="rowSelection" :bordered="false" :pagination="false" column-resizable :scroll="{ minWidth: 1920 }" style="width: 100%" /> -->

    <!-- <a-modal visible /> -->
    <div class="header"></div>
    <div class="content">
      <teaching-manage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import TeachingManage from '@/setting/component/class-manage/teaching-class-manage/index.vue';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    width: 300,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    minWidth: 200,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    minWidth: 200,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    minWidth: 200,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    minWidth: 200,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 300,
    fixed: 'right',
  },
].map((item: any) => {
  item.ellipsis = true;
  item.tooltip = true;
  return item;
});
const data = reactive([
  {
    key: '1',
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.come',
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com',
  },
  {
    key: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
  },
  {
    key: '4',
    name: 'Ed Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com',
  },
  {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
]);
const rowSelection = reactive({
  // fixed: true,
  type: 'checkbox',
  width: 60,
  showCheckedAll: true,
  onlyCurrent: false,
});
</script>
<style scoped lang="less">
.home-container {
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #edf1f7;
  gap: 8px;
  padding: 10px;

  .header {
    height: 105px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0px 0px 8px 0px rgba(0, 101, 255, 0.06);
  }
  .content {
    flex: 1;
    border-radius: 16px;
    padding: 16px;
    background: #fff;
    box-shadow: 0px 0px 8px 0px rgba(0, 101, 255, 0.06);
  }
}
</style>
