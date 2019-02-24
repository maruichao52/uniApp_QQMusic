<template>

	<view class="main">
		<view class="findMusic">
			<view class="search_bar_cont">
				<input type="text" @input="inputChange" class="sou_input" value="" placeholder="搜索歌曲/专辑/歌手" />
			</view>
		</view>
		<!-- 主要内容区域 -->
		<view class="context">

			<view class="picker_bar">
				<picker mode="selector" range-key="com" :range="pickerArray" @change="selectChange">
					<view class="pick_text">{{pickerText.com}}</view>
				</picker>
			</view>
			<view class="button_bar">
				<button type="primary" @click="requestSongs">搜索</button>
			</view>

			<!-- 内容显示区 -->
			<view class="showContext">

				<view class="for_list" v-for="(item,index) in songsList" :key="item.id">
					<view class="songContext">
						<view class="song_sin" v-on:click="playMusic" v-bind:id="index">
							{{item.name}}-{{item.singer}}
						</view>
						<view class="song_ply">
							<text class="iconfont">&#xe78e;</text>
						</view>
					</view>
				</view>
			</view>


		</view>

		<view class="play_Context" v-show="isShow">
			<!-- playContext box -->
			<view class="audio_box">
				<view class="box_left">
					<image class="lef_img" v-bind:src="song.pic" mode=""></image>
				</view>
				<view class="box_righ">
					<view class="box_top">
						{{song.name}}
					</view>
					<view class="box_btom">
						{{song.singer}}
					</view>
				</view>

				<view class="box_button" @click="stopMusic">
					<text v-if="!isPlay" class="iconfont">&#xe60c;</text>
					<text v-else class="iconfont">&#xe723;</text>
				</view>
				<view class="box_button" @click="nextMusic">
					<text class="iconfont">&#xe7ff;</text>
				</view>
			</view>
		</view>
		
	</view>

</template>

<script src="./script.js">
	
</script>

<style src="./style.css">
	
</style>
