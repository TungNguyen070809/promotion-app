const modal = require('./modal.controller');
const renderShopNameFromHeader = function(str){
    let objURL = {};
    str.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function($0, $1, $2, $3) {
            objURL[$1] = $3;
    });
    return objURL;
}
initCountTotalTurned = (list) => {
    if(!list || list.length === 0)
        return 0;
    let total = 0;
    total = list.reduce((a, b) => a + parseInt(b.turned) , 0);
    return total;
}
initArrayTimeDashboard = () => {
    var date = new Date();
    var days = [], tam = [], index = 0, currentDay = date.getDate(), timeDown = 0;
    var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    while (index < 2 && timeDown <= 14) {
        let dateTam = new Date();
        dateTam.setDate(dateTam.getDate() - timeDown);
        tam.unshift(dateTam.getDate());
        let dd = dateTam.getDay();
        if(dd === 1){
            days.push(tam);
            tam = [];
            index ++;
        }
        timeDown++
    }
    return days;
}
initArrayWeekDashboard = (list_customer) => {
    let arrWeek = initArrayTimeDashboard();
    let arrCount = [];
    for(let i = 0; i < arrWeek.length; i++){
        let arrItem = arrWeek[i], tam = [];
        for(let j=0; j<arrItem.length; j++ ){
            let day = arrItem[j], count = 0;
            //let index = list_customer.find(x => x.time.getDate() === day).map(x => x.email);
            list_customer.map(item => {
                if(item.time.getDate() === day)
                    count ++;
            })
            tam.push(count);
        }
        arrCount.push(tam);
    }
    return arrCount;
}
initObjDeviceDashboard = (list_customer) => {
    let obj = [0,0,0];
    list_customer.map(item => {
        let device = item.device[0];
        switch(device){
            case 'desktop':
                obj[0] += 1;
                break;
            case 'mobile':
                obj[2] += 1;
                break;
            default:
                obj[1] += 1;
                break;
        }
    })
    return obj;
}
initDashboardObject = (dataShop) => {
    let result = {}, {list_customer} = dataShop;
    result.totalView = dataShop.totalView;
    result.totalEmail = list_customer.length || 0;
    result.totalTurned = initCountTotalTurned(list_customer);
    result.dashboardWeek = initArrayWeekDashboard(list_customer);
    result.dashboardDevice = initObjDeviceDashboard(list_customer);
    return result;
}
module.exports = {
    initGetPromotion: (req, res) => {
        var shopName = req.query.shop;
        if(shopName === '' || !shopName){
            let { referer } = req.headers;
            shopName = renderShopNameFromHeader(referer).shop || '';
        }
        if(typeof shopName === 'undefined' || !shopName || shopName === ''){
            res.json({ error: true, message: 'Lỗi! Lấy dữ liệu thất bại...', db_shop: {} });
            return false;
        }
        modal.initFindOneShop(shopName, (data) => {
            if (data.shop_domain && data.shop_domain !== '') {
                let dashboardObj = initDashboardObject(data);
                data.dashboard = dashboardObj;
                delete data.shop_domain;
                delete data.list_customer;
                delete data.totalTurned;
                delete data.totalView;
                res.json({ error: null, message: 'Lấy dữ liệu thành công', db_shop: data });
            } else {
                res.json({ error: true, message: 'Lỗi! Lấy dữ liệu thất bại...', db_shop: {} });
            }
        }) 
    },
    initAddPromotion: (req, res) => { 
        const {type, data} = req.body; 
        // console.log(req.body)
        // var list = reqData.list_promotions.map(function (item) {
        //                 return { promotionName: item["promotionName"], promotionLevel: item["promotionLevel"], promotionCode: item["promotionCode"] }
        //             });
        // reqData.list_promotions = list;
        let { referer } = req.headers;
        shop_domain = renderShopNameFromHeader(referer).shop || '';
        console.log('shop_domain', shop_domain); 
        if(!shop_domain || !data){
            res.json({ error: true, message: 'Lỗi! Cập nhật dữ liệu thất bại...', db_shop: {} })
            return false;
        }
        let dataUpdate = {};
        switch(type){
            case 'info':
                break;
            case 'settings':
                break;
            case 'need_take':
                break;
            case 'list_promotions':
                break
            default:
                break
        }
        if(type === 'multiple'){
            console.log('is array');
            let promise = data.map(item => {
                return new Promise((resolve, reject) => {
                    modal.initUpdateDocumentShop(shop_domain, item.type, item.data, (resp) => {
                        if (resp.error || !resp.data)
                            reject(resp.error);
                        resolve(resp);
                    })
                })
            });
            Promise.all(promise).then(resp => {
                if(resp.length === 2)
                    res.status(200).json({ error: false, statusCode: 200, message: 'Cập nhật dữ liệu thành công!' });
                else
                    res.json({ error: true, message: 'Lỗi! Cập nhật dữ liệu thất bại'});
            })
            return false;
        }
        console.log('not array');
        if(Array.isArray(data)){
            for (var i = 0; i < data.length; i++) {
                delete data[i].toggle;
            }
        }
        console.log(data)
        modal.initUpdateDocumentShop(shop_domain, type, data, (resp) => {
            if (resp.error)
                res.json({ error: true, message: 'Lỗi! Cập nhật dữ liệu thất bại...'});
            else if (!resp.data)
                res.json({ error: true, message: 'Lỗi! Không tìm thấy cửa hàng...'});
            else{
                res.status(200).json({ error: false, statusCode: 200, message: 'Cập nhật dữ liệu thành công!' });
            }
        });
        // modal.initFindOneShop(name, (data) => {
        //     if (data) {
        //         const body = req.body.promotion;
        //         //console.log(body)
        //         var data = body.map(function (item) {
        //             return { promotionName: item["promotionName"], promotionLevel: item["promotionLevel"], promotionCode: item["promotionCode"] }
        //         });
        //         //console.log(data)
        //         modal.initUpdateDocumentShop(name, 'list_promotions', data, (err, resp) => {
        //             //console.log(resp);
        //             if (err)
        //                 res.json({ error: true, message: 'Update promotion thất bại' });
        //             else if (!data)
        //                 res.json({ error: true, message: '404! Không tìm thấy shop' });
        //             else
        //                 res.json({ error: false, message: 'Update thành công!', promotions: resp.data });
        //         })
        //     } else {
        //         res.json({ error: true, message: 'Không tìm thấy shop' });
        //     }
        // })
    }
}