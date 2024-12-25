<template>
	<el-dialog
		:modelValue="visible"
		:width="width"
		:title="title"
		:close-on-click-modal="false"
		:close-on-press-escape="false"
		class="cx-modal"
		modal-class="cx-modal-mask"
		v-bind="$attrs"
		@close="handleClose"
	>
		<slot>
			<div class="modal-tip">
				<div class="text">
					{{ tip }}
				</div>
			</div>
		</slot>
		<template #footer>
			<el-button :loading="confirmLoading" type="primary" class="confirm-btn" @click="handleConfirm"> {{ confirmText }} </el-button>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue'
const props = withDefaults(
	defineProps<{
		visible?: boolean
		tip?: string
		confirmText?: string
		confirmLoading?: boolean
	}>(),
	{
		visible: false,
		tip: '',
		confirmText: '确定',
		confirmLoading: false
	}
)
const emits = defineEmits<{
	(e: 'update:visible', value: boolean): void
	(e: 'confirm'): void
	(e: 'close'): void
}>()

const { tip } = toRefs(props)
const title = computed(() => (tip.value ? '提示' : ''))
const width = computed(() => (tip.value ? 400 : 600))

const handleClose = () => {
	if (props.tip) {
		emits('update:visible', false)
	}
	emits('close')
}

const handleConfirm = () => {
	if (props.tip) {
		emits('update:visible', false)
	}
	emits('confirm')
}
</script>

<style lang="less">
.cx-modal-mask {
	background-color: rgba(248, 249, 250, 0.7);
}
.cx-modal {
	padding: 0 !important;
	border-radius: 20px !important;
	background: #fff;
	box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1) !important;
	.el-dialog__header {
		display: flex;
		align-items: center;
		height: 44px;
		padding: 0 13px 0 30px;

		.el-dialog__title {
			color: #557ca7;
			font-family: 'PingFang SC';
			font-size: 16px;
			font-weight: 600;
		}
		.el-dialog__headerbtn {
			width: 18px;
			height: 18px;
			right: 13px;
			top: 13px;
			.el-icon {
				width: 100%;
				height: 100%;
				background-image: url('./icon/close.svg');
				svg {
					display: none;
				}
			}
		}
	}
	.el-dialog__body {
		.modal-tip {
			min-height: 146px;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 30px;
			.text {
				color: #4d4d4d;
				font-family: 'PingFang SC';
				font-size: 14px;
				font-weight: 400;
			}
		}
	}
	.el-dialog__footer {
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50px;

		.el-button {
			margin: 0;
			border-radius: 6px;
			height: 32px;
			width: 100px;
			span {
				font-family: 'PingFang SC';
				font-size: 14px;
				font-weight: 400;
			}
		}
		.confirm-btn {
			background: #006ce2;
			box-shadow: 0px 2px 10px 0px rgba(0, 108, 226, 0.3);
			height: 32px;
			width: 100px;
			span {
				color: #fff;
				font-family: 'PingFang SC';
				font-size: 14px;
				font-weight: 400;
			}
		}
	}
}
</style>
