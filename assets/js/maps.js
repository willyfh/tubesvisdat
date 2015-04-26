require.config({
    packages: [
        {
            name: 'echarts',
            location: '//ecomfe.github.io/echarts/src',
            main: 'echarts'
        },
        {
            name: 'zrender',
            location: '//ecomfe.github.io/zrender/src',
            main: 'zrender'
        }
    ]
});

var mapOption = {
    title : {
        text: 'Kasus Korupsi di Indonesia Berdasarkan Provinsi (Semester I 2014)',
        subtext: 'Data from ICW',
        sublink: 'http://www.census.gov/popest/data/datasets.html',
        x:'right'
    },
    tooltip : {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter : function (params) {
            var value = (params.value + '').split('.');
            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
            return params.name + '<br/>' + params.seriesName + ' : ' + value;
        }
    },
    dataRange: {
        x : 'right',
        min: 500000,
        max: 38000000,
        color: ['orangered','yellow','lightskyblue'],
        text:['High','Low'],           // 文本，默认为数值文本
        calculable : true
    },
    toolbox: {
        show : true,
        //orient : 'vertical',
        x: 'left',
        y: 'top',
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    series : [
        {
            name: 'USA PopEstimates',
            type: 'map',
            roam: true,
            mapType: 'USA', // 自定义扩展图表类型
            itemStyle:{
                emphasis:{label:{show:true}}
            },
            // 文本位置修正
            textFixed : {
                Alaska : [20, -20]
            },
            data:[
                {"NAME_1" : 'Aceh', value : 20000000},
                {"NAME_1" : 'Bangka-Belitung', value : 4822023}
            ]
        }
    ]
};

var modusOption = {
    title : {
        text: '世界人口总量',
        subtext: '数据来自网络'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['2011年', '2012年']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'value',
            boundaryGap : [0, 0.01]
        }
    ],
    yAxis : [
        {
            type : 'category',
            data : ['巴西','印尼','美国','印度','中国','世界人口(万)']
        }
    ],
    series : [
        {
            name:'2011年',
            type:'bar',
            data:[18203, 23489, 29034, 104970, 131744, 630230]
        },
        {
            name:'2012年',
            type:'bar',
            data:[19325, 23438, 31000, 121594, 134141, 681807]
        }
    ]
};

require(
    [
        'echarts',
        'echarts/chart/map',
        'echarts/chart/bar'
    ],
    function (ec) {
        require('echarts/util/mapData/params').params.USA = {
		    getGeoJson: function (callback) {
		        // $.getJSON('//ecomfe.github.io/echarts/doc/example/geoJson/USA_geo.json', callback);
                $.getJSON('assets/js/geojson.json', callback); // Offline
                // $.getJSON('//bitbucket.org/rifani/geojson-political-indonesia/raw/0e89dcb0b0454c5afffd414fd0cd0c25f1688d10/IDN_adm_1_province.json', callback); // Online
		    }
		    // specialArea : {
		    //     Alaska : {              // 把阿拉斯加移到美国主大陆左下方
		    //         left : -127,        // 安放位置起始点为西经113
		    //         top : 30,           // 北纬31度
		    //         width : 15,         // 区间大小宽高不大于15度
		    //         height : 15
		    //     },
		    //     Hawaii : {
		    //         left : -110,        // 夏威夷
		    //         top : 28,
		    //         width : 5,
		    //         height : 5
		    //     },
		    //     'Puerto Rico' : {       // 波多黎各
		    //         left : -76,
		    //         top : 26,
		    //         width : 2,
		    //         height : 2
		    //     }
		    // }
		}

        var mapChart = ec.init(document.getElementById('map'));


        mapChart.setOption(mapOption);

        var modusChart = ec.init(document.getElementById('modus-chart'));
        modusChart.setOption(modusOption);
       
    }
);