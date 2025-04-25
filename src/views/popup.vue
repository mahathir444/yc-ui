<template>
  <div class="test">
    <div style="width: 300px">
      dropdown
      <yc-dropdown @select="(v) => console.log('选中', v)">
        <yc-button>测试嵌套</yc-button>
        <template #content>
          <yc-dsubmenu>
            分组1
            <template #content>
              <yc-dsubmenu>
                分组2
                <template #content>
                  <yc-dsubmenu>
                    分组3
                    <template #content>
                      <yc-dsubmenu>
                        分组4
                        <template #content>
                          <yc-doption v-for="i in 6" :key="i" :value="i">
                            选项{{ i }}
                          </yc-doption>
                        </template>
                      </yc-dsubmenu>
                      <yc-doption v-for="i in 6" :key="i" :value="i">
                        选项{{ i }}
                      </yc-doption>
                    </template>
                  </yc-dsubmenu>
                  <yc-doption v-for="i in 6" :key="i" :value="i">
                    选项{{ i }}
                  </yc-doption>
                </template>
              </yc-dsubmenu>
              <yc-doption v-for="i in 6" :key="i" :value="i">
                选项{{ i }}
              </yc-doption>
            </template>
          </yc-dsubmenu>
          <yc-doption v-for="i in 6" :key="i" :value="i">
            选项{{ i }}
          </yc-doption>
        </template>
      </yc-dropdown>
    </div>
    <div style="width: 300px">
      popover
      <yc-popover trigger="click">
        <yc-button>测试嵌套</yc-button>
        <template #content>
          <yc-empty description="暂无数据" style="width: 180px" />
        </template>
      </yc-popover>
    </div>
    <div style="width: 300px">
      tooltip
      <yc-tooltip>
        <yc-button>测试嵌套</yc-button>
        <template #content>
          <yc-empty style="background: rgb(29, 33, 41); width: 180px" />
        </template>
      </yc-tooltip>
    </div>
    <div style="width: 300px">
      popoupConfirm
      <yc-popconfirm content="确认删除吗">
        <yc-button>测试嵌套</yc-button>
      </yc-popconfirm>
    </div>
    <div style="width: 300px">
      tooltip
      <yc-trigger>
        <yc-button>popover</yc-button>
        <template #content>
          <yc-empty
            style="
              height: 100px;
              width: 180px;
              border: 1px solid rgb(229, 230, 235);
              border-radius: 4px;
              box-shadow: 0 4px 10px #0000001a;
            "
          />
        </template>
      </yc-trigger>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.test {
  height: 100%;
  width: 100%;
  height: 300vh;
  overflow: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.popover-content {
  width: 200px;
  background-color: #fff;
  border: 1px solid rgb(229, 230, 235);
  border-radius: 4px;
  box-shadow: 0 4px 10px #0000001a;
}
</style>
