<template>
	<el-table fit :data="calendar" :row-class-name="tableRowClassName" border style="width: 100%"
		@cell-click="dblclickTable">
		<el-table-column prop="lesson_id" label="课" width="180">
		</el-table-column>
		<el-table-column label="开始时间" width="180">
			<template slot-scope="scope">
				<el-date-picker v-if="
                    scope.row.index === tabClickIndex &&
                      tabClickLabel === '开始时间'
                  " v-model="upTable.start_time" type="datetime" format="yyyy-MM-dd HH:mm:ss"
					value-format="yyyy-MM-dd HH:mm:ss" size="mini" @blur="saveEdit" placeholder=""></el-date-picker>
				<span v-else>{{ scope.row.start_time}}</span>
			</template>
		</el-table-column>
		<el-table-column label="结束时间" width="180">
			<template slot-scope="scope">
				<el-date-picker v-if="
                    scope.row.index === tabClickIndex &&
                      tabClickLabel === '结束时间'
                  " v-model="upTable.end_time" type="datetime" format="yyyy-MM-dd HH:mm:ss"
					value-format="yyyy-MM-dd HH:mm:ss" size="mini" @blur="saveEdit" placeholder=""></el-date-picker>
				<span v-else>{{ scope.row.end_time }}</span>
			</template>
		</el-table-column>
		<el-table-column label="状态">
			<template slot-scope="scope">
				<el-tag :type="scope.row.status === 1 ? 'success' : ''">
					{{ scope.row.status === 1 ? "已结束" : "未开始" }}</el-tag>
			</template>
		</el-table-column>
		<el-table-column label="操作">
			<template slot-scope="scope">
				<el-button type="text" @click="handleLink(scope.row)">去点名</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
	export default {
		props: {

		},
		data() {
			return {

			}
		},
		components: {

		}
	}
</script>

<style>


</style>