import imple from '../../JS/util.js';

export default {
	data() {
		return {
			inputText: "",
			pickerArray: [{
					com: "网易云",
					id: "netease"
				},
				{
					com: "QQ音乐",
					id: "tencent"
				},
				{
					com: "酷狗",
					id: "kugou"
				}
			],
			pickerText: {
				com: "点我选择搜索引擎",
				id: ""
			},
			songsList: [],
			songsIndex:0,//播放下标
			song:{},//当前播放对象
			innerAudio:{},//内部播放对象
			isPlay:false,
			isShow:false
		}
	},
	onLoad() {

	},
	methods: {
		inputChange: function(res) {

			this.inputText = res.detail.value;
		},

		requestSongs: function() {

			var temp = this;


			if (temp.pickerText.id == "") {

				return;
			}
			uni.request({
				url: "https://api.bzqll.com/music/" + temp.pickerText.id + "/search",

				data: {

					key: imple.key,
					s: temp.inputText,
					type: "song",
					limit: 5,
					offset: 0
				},

				success: function(res) {

					temp.songsList.splice(0); //先删除所有的对象；

					res.data.data.forEach(function(item) {
						temp.songsList.push(item)
					})
				}
			})
		},
		selectChange: function(res) {
			//改变选择器
			this.pickerText = this.pickerArray[res.detail.value];
		},
		playMusic: function(res) {
			//点击播放歌曲
			this.songsIndex = res.target.id;
			
			this.song =  this.songsList[res.target.id];
			console.log(this.songsIndex);
			this.playMus();
		},
		stopMusic:function(){
			//暂停或者播放
			
			if (this.isPlay) {
				//正在播放 则暂停
				
				this.innerAudio.pause();
				
				this.isPlay = false;
			} else {
				this.innerAudio.play();
				//暂停了 则播放
				this.isPlay = true;
			}
		},
		nextMusic:function(){
			//下一曲
			
			
			if (this.songsList.length == 0) {
				
				uni.showToast({
					title:"现在还没有歌曲"
				})
				return;
			} else if (this.songsIndex == this.songsList.length-1) {
				//切换到最后一首歌了 循环 
				this.songsIndex = -1;
			}
			
			this.songsIndex = parseInt(this.songsIndex)+1;
			
			console.log(this.songsIndex);
			
			this.song = this.songsList[this.songsIndex];
			
			//现在需要播放歌曲,创建对象
			this.playMus();
		},
		playMus:function(){
			//播放歌曲
			if (Object.keys(this.innerAudio).length == 0) {
				//空对象就创建
				this.innerAudio = uni.createInnerAudioContext();
				
			} else {
				//不是空对象 销毁再创建
				this.innerAudio.destroy();
				this.innerAudio = uni.createInnerAudioContext();
			}
			
			this.innerAudio.src = this.song.url;
			this.innerAudio.play();
			this.isPlay = true;
			this.isShow = true;
			//都要执行
			var temp = this;
			this.innerAudio.onEnded(function(){
				//自然播放结束 切换下一首
				console.log("end")
				temp.nextMusic();//切换下一首
			})
		}
	}
}
