var serviceFee //服务费
$(function () {
    var hotelInfo
    var userInfo
    if (userInfo != null) {} //用户信息弹窗
    var hotelId //酒店编号
    var hotelCode //酒店编码
    var roomCode //房型编码
    var ratePlanCode //房间编码
    var total //订单总额
    var finalOrderPrice //最终提交订单总额（带小数点）
    var auditingRoomPrice //审批返回房费
    var totalPriceAcc //返回后台总价   
    var totalAcc //返回后台单价
    var roomPrice //房间平均价格
    var auditingPerson //审批人信息
    var isOpenAudit //是否审批
    var maxRoomPrice //房间最高单价 
    getpolicyreason()

    function renderBotPrice() { //价格渲染
        ;
    }

    function bindDetailEvent() { //房费详情点击
        ;
    }
    $('#backToPrevStage').on('click', function () {}) //返回以上步骤点击事件
    function Reduce(Num) {} //减少房间
    function ingrace(maxNum) {} //减少房间
    Reduce(1)
    //监视房间剩余数
    if (hotelInfo.currentAlloment == 0) {
        ingrace(5);
    } else {
        ingrace(hotelInfo.currentAlloment);
    }

    function initServiceFee() {
        dataBind()
    }
    initServiceFee()

    function dataBind() {;
    }
    $('#dateBtn').click(function () {
        var param = {};
        param.arrivalDate = arrDate
        param.departureDate = leaDate
        param.hotelId = hotelId;
        param.hotelCode = hotelCode;
        param.personNumber = 1;
        param.roomCode = roomCode;
        param.ratePlanCode = ratePlanCode;
        param.channelId = hotelInfo.channelId;
        onloadHotelRooms(param)
    })

    function onloadHotelRooms(param) {;
    }

    getPayType()
    function getPayType(){}

    function checkPolicyOver() {} //政策校验
    checkPolicyOver()
})
//错误默认图片
function imgError()
//服务费
function initServiceFee(userInfo)
//违规原因
function getpolicyreason()