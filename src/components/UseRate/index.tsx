import React,{useRef,useEffect} from 'react';
import * as echarts from 'echarts';
import 'echarts/lib/chart/line';
import styles from './index.scss';

type defaultProps = {
   procent:string|number,
   title:string
};
const UseRate = (props: defaultProps) => {
const gridRef = useRef<HTMLDivElement>(null);
const {procent,title} = props
useEffect(() => {
    initChart()
})
const initChart = ()=>{
    if (gridRef.current) {
        const chart = echarts.init(gridRef.current);
        const option:any = {
            series: [{
                type: 'gauge',
                progress: {
                    show: true,
                    width: 20,
                    itemStyle:{
                        color:{
                            colorStops:[
                                {
                                    offset: 0, color: '#087885' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#03c5ca' // 100% 处的颜色
                                }]
                        }
                    }
                },
                axisLine: {
                    show:true,
                    lineStyle: {
                        color:[[1, '#084356']],
                        width: 20
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show:false,
                },
                axisLabel: {
                    show:false
                },
                pointer:{
                    show:false
                },
                anchor: {
                    show: false,
                },
                title: {
                    show: true,
                    width:30,
                    height:4,
                    borderRadius:4,
                    backgroundColor:'#01fff6',
                    offsetCenter:['0','80%'],
                     shadowColor:"#01fff6",
                     shadowBlur:5
                },
                detail: {
                    valueAnimation: true,
                    fontSize: 24,
                    color:'#E6FFFD',//#03c5ca
                    textBorderColor :'#01fff6',
                    textBorderWidth:1,
                    textShadowBlur:5,
                    offsetCenter: ['0', '10%'],
                    formatter: function (value:any) {
                        return value + '%'
                    }
                },
                data: [{
                    value: procent
                }]
            }]
        }
        chart.setOption(option)
    }
}
  return ( 
      <div className={styles.warp}>
        <div className={styles.box}>
          <div className={styles.chartBox} ref={gridRef}></div>
        </div>
        <div className={styles.title}>
            {title}
        </div>
      </div>
     
  )
};

export default UseRate;
