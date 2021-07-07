



// api.getDetail({
//     params:{
//         goodId:2
//     }
// },function(data){
//     console.log(data);
// })

// const { clear } = require("console");

// var type_one;
var res = (location.search).split('=')[1]
// console.log(res);


REQUEST.get('/detail', {
    params: {
        goodId: res
    }
}, function (data) {
    console.log(data);
    var magnifier = document.querySelector('.magnifier')
    var html = magnifier.innerHTML
    html += `
    <div class="small">
        <div class="mask">
        </div>
        <img src="${data[0].img_list_url}" alt="">
    </div>
    <div class="big">
        <img src="${data[0].img_list_url}" alt="">
    </div>
    `
    magnifier.innerHTML = html

    var tab = document.querySelector('.tab')

    var imgs = data[0].imgs.replace(/[\[\]]/g, "").split(",")
    var tab_html = tab.innerHTML
    tab_html += `
        <li><img src=${imgs[0]} alt=""></li>
        <li><img src=${imgs[1]} alt=""></li>
        <li><img src=${imgs[2]} alt=""></li>
        <li><img src=${imgs[3]} alt=""></li>
        <li><img src=${imgs[4]} alt=""></li>
        `
    tab.innerHTML = tab_html
    var imgSrc=document.querySelectorAll('.tab img')
    var smallSrc=document.querySelector('.small img')
    var bigSrc=document.querySelector('.big img')
    for(let i=0;i<imgSrc.length;i++){
        imgSrc[i].addEventListener('click',function(){
            smallSrc.src=imgSrc[i].src
            bigSrc.src=imgSrc[i].src
            for(let k=0;k<imgSrc.length;k++){
                imgSrc[k].style.border='none'
            }
            imgSrc[i].style.border='4px solid green'
        })
    }


    var title = document.querySelector('.title')
    var title_html = title.innerHTML

    title_html = `
        <h3>${data[0].title}</h3>
        <p>￥${data[0].price}</p>
        <span>⭐⭐⭐⭐⭐ 5.0</span>
        <div class="addshopCar">
            加入购物车
        </div>
        `
        // type_one=data[0].type_one
    title.innerHTML = title_html
    console.log(data[0].type_one);
    REQUEST.get('/search', {
        params: {
           word:data[0].type_one
        }
    }, function (data) {
        console.log(123);
        var footer = document.createElement('footer')
        footer.className = 'w'
        document.body.append(footer)
        var h2=document.createElement('h2')
        footer.appendChild(h2)
        h2.innerText='相关商品列表'
        var related=document.createElement('div')
        related.className='related'
        footer.appendChild(related)
        var ul=document.createElement('ul')
        related.appendChild(ul)
        var list = ul.innerHTML
        for (var i = 0; i < 10; i++) {
            list += `
                <li class="related-item">
                    <img src="${data[i].img_list_url}" alt="">
                    <h3>${data[i].title}</h3>
                    <span class="fh">￥</span><span class="fh">59</span>
                    ${data[i].mack}
                </li>
        `
            ul.innerHTML = list
        }
    }
    )

})
    // console.log(type_one);

// 固定导航

fixedTop()

// 回到顶部
backTop()
// 延时获取
var getele = setTimeout(function () {
    var small = document.querySelector('.small')
    // console.log(small);
    var mask = document.querySelector('.mask')
    var big = document.querySelector('.big img')
    var magnifier = document.querySelector('.magnifier')
    small.addEventListener('mousemove', function (e) {
        var top = e.pageY - magnifier.offsetTop - 50;
        var left = e.pageX - magnifier.offsetLeft - 50;
        top = top < 0 ? 0 : top > 300 ? 300 : top
        left = left < 0 ? 0 : left > 300 ? 300 : left
        mask.style.top = top + 'px';
        mask.style.left = left + 'px'
        big.style.top = - (top * ( 800/300) )+ 'px'
        big.style.left = - (left *( 800/300)) + 'px'   
    })
    clearTimeout(getele)
}, 1000)

