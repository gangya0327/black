	//加载服务费
	var serviceFee = 0;
	$(function() {
	    var hotelInfo = window.sessionStorage.getItem("hotelOrderInfo");
	    var userInfo = localStorage.getItem("loginUser");
	    hotelInfo = eval("(" + hotelInfo + ")");
	    userInfo = eval("(" + userInfo + ")");
	    //console.log(hotelInfo)
	    //console.log(userInfo)
	    //	console.dir(hotelInfo)
	    //	console.dir(userInfo)
	    if (userInfo != null) {
	        console.log(userInfo)
	        if (userInfo.orderRole == 0 || userInfo.orderRole == 1) {
	            $("#newPassenger").addClass("hidden");
	            $("#newPassenger").next("span").addClass('hidden');
	            var inp = $("input[name='customerNames']").eq(0);
	            inp.val(userInfo.userName);
	            inp.attr("userId", userInfo.userId);
	            inp.attr("passengerId", userInfo.userId);
	            inp.attr("idCardCode", userInfo.idCardCode);
	            inp.attr("idCardType", userInfo.idCardType);
	        }
	    }

	    //酒店编号
	    var hotelId = hotelInfo.hotelId;
	    //酒店编码
	    var hotelCode = hotelInfo.hotelCode;

	    //房型编码
	    var roomCode = hotelInfo.roomCode;
	    //房间编码
	    var ratePlanCode = hotelInfo.ratePlanCode;

	    //订单总额
	    var total = priceCarry(hotelInfo.averageRate) * eval("(" + hotelInfo.nightlyRates + ")").length;
	    //var total = hotelInfo.totalRate;
	    //房间价格
	    var roomPrice = hotelInfo.averageRate;
	    //console.dir(total);

	    //审批人信息
	    var auditingPerson = [];
	    var isOpenAudit; //是否审批

	    //加载违规原因
	    getpolicyreason();


	    //注册房间数量修改事件
	    function Reduce(Num) {
	        $(".reduce").click(function() {
	            var len = $(".takeHotelInfo ul li.pas").length;
	            var num = $(this).next("div").text();
	            if (userInfo != null) {
	                if (userInfo.orderRole != 0 && userInfo.orderRole != 1) {
	                    if (len > Num) {
	                        num--;
	                        $(this).next("div").text(num);
	                        $(".takeHotelInfo .rColor").html(num);
	                        //				var len = $(".takeHotelInfo ul li").length;
	                        $(".takeHotelInfo ul").children("li").eq(len).remove();
	                        //获取当前总价

	                        var totalPrice = total * num;
	                        $(".roomCount").html(num);
	                        var day = $(".stayDays").html();
	                        $("#totalPrice").html(accAdd(totalPrice, serviceFee * num * day));
	                        var html2 = "<span></span><b class='price'>服务费：<span class=\"rColor\">￥" + serviceFee + "</span>间/夜</b>";
	                        $(".otherDetail").html(html2);
	                        $(".Bprice span").html("￥" + totalPrice);
	                    }
	                }
	            }
	            //政策校验
	            checkPolicyOver();
	        })
	    }

	    function ingrace(maxNum) {

	        $(".ingrace").click(function() {
	            var num = $(this).prev("div").text();
	            if (userInfo != null) {
	                if (userInfo.orderRole != 0 && userInfo.orderRole != 1) {
	                    if (num < maxNum) {
	                        num++;
	                        $(this).prev("div").text(num);
	                        $(".takeHotelInfo .rColor").html(num);
	                        $(".passenger_max").html(num);
	                        var html = "<li class='pas'><label>房间" + num + "：</label><input type=\"text\" name=\"customerNames\" value=\"\"  disabled=\"disabled\" placeholder=\"请选择住客\"/></li>";
	                        $(".takeHotelInfo ul").append(html);
	                        var totalPrice = total * num;
	                        var day = $(".stayDays").html();
	                        $("#totalPrice").html(accAdd(totalPrice, serviceFee * num * day));
	                        var html2 = "<span></span><b class='price'>服务费：<span class=\"rColor\">￥" + serviceFee + "</span>间/夜</b>";
	                        $(".otherDetail").html(html2);
	                        $(".roomCount").html(num);
	                        $(".Bprice span").html("￥" + totalPrice)
	                    }
	                }
	            }

	            //政策校验
	            checkPolicyOver();
	        })

	    }

	    Reduce(1);
	    //监测房间剩余数量
	    if (hotelInfo.currentAlloment == 0) {
	        ingrace(5);
	    } else {
	        ingrace(hotelInfo.currentAlloment);
	    }

	    function initServiceFee() {
	        $.doAjax({
	            url: '/search/train/service/fee/301',
	            type: 'get',
	            async: false,
	            success: function(data) {
	                if (data != null && data != "") {
	                    if (data.serviceFee != null && data.serviceFee != '') {
	                        serviceFee = data.serviceFee;
	                    }
	                }
	                dataBind();
	            }
	        });
	    }
	    //数据绑定
	    //if(hotelInfo.channelId == 1008){
	    initServiceFee();
	    //}else{
	    //	dataBind();
	    //}

	    function dataBind() {
	        $(".hotelPic").html("<img id='hotelImg' src='" + hotelInfo.coverImageUrl + "' onerror='imgError(this);' />");
	        var Shtml = "<p class=\"hotelName\">" + hotelInfo.hotelName + "</p>";
	        /*Shtml+="<p>"+hotelInfo.roomName+"</p>";*/
	        Shtml += "<p>地址：" + hotelInfo.address + "</p>";
	        Shtml += "<p>电话：" + hotelInfo.phone + "</p>";
	        Shtml += "<p class = \"hidden\" ratePlanCode=" + hotelInfo.ratePlanCode + " roomCode=" + hotelInfo.roomCode + " hotelCode=" + hotelInfo.hotelCode + " hotelId=" + hotelInfo.hotelId + "></p>";
	        $(".serType").html(Shtml);

	        if (hotelInfo.broadnet == 1) {
	            broadnet = "宽带/WIFI";
	        } else {
	            broadnet = "无上网服务";
	        }
	        var Hhtml = "<li><p><span>房型：" + hotelInfo.roomName + "</sapn></p><p><span>床型：</span>" + hotelInfo.bedType + "</p><p><span>备注：</span>" + hotelInfo.breakfast + "</p></li>";
	        Hhtml += "<li><p><span>房型说明：" + hotelInfo.roomDepict + "</span><p></li>";
	        var policy = "";
	        if (hotelInfo.cancellationPolicy) {
	            var str = hotelInfo.cancellationPolicy.split(",");
	            for (var int = 0; int < str.length; int++) {
	                if (int == 0) {
	                    policy += str[int];
	                } else {
	                    policy += "<br/>" + str[int];
	                }
	            }
	        }
	        Hhtml += "<li><p><span class='policy'>取消政策：</span><span class='policyInfo'>" + policy + "</span><p></li>";
	        $(".hotelType ul").html(Hhtml);

	        //	var Ohtml = "<p class=\"otherInfo\"><span>其它：</span>"+hotelInfo.description+"</p>";
	        //		Ohtml+=	"<p class=\"servicPhone\"><span>客服电话：</span>"+hotelInfo.phone+"</p>";
	        //	$(".hotelDetaile section").html(Ohtml);

	        //每日价格
	        var nightlyRates = eval("(" + hotelInfo.nightlyRates + ")");
	        //日期
	        var week1 = getWeekDayStr(hotelInfo.arrivalDate);
	        var week2 = getWeekDayStr(hotelInfo.departureDate);
	        //	var dateHtml = "<span id=\"arrivalDate\">"+hotelInfo.arrivalDate+"</span>";
	        //	dateHtml+= "（<b class='week1'>"+week1+"</b>）到<span id=\"departureDate\">"+hotelInfo.departureDate+"</span> ";
	        //	dateHtml+="（<b class='week2'>"+week2+"</b>）共<span class='stayDays'>"+nightlyRates.length+"</span>晚";
	        //	$('.dateDiv').html(dateHtml);

	        $("#arrivalDate").html(hotelInfo.arrivalDate);
	        $("#departureDate").html(hotelInfo.departureDate);
	        $(".week1").html(week1);
	        $(".week2").html(week2);
	        $(".stayDays").html(nightlyRates.length);

	        if (hotelInfo.currentAlloment != 0) {
	            $(".slNum .restRoom").html("(仅剩" + hotelInfo.currentAlloment + "间)");
	        } else {
	            $(".slNum .restRoom").html("(一次最多订5间)");
	        }

	        $('#contactName').val(userInfo.userName);
	        $('#contactPhone').val(userInfo.userPhone);

	        //明细
	        //每日价格
	        var nightlyRates = eval("(" + hotelInfo.nightlyRates + ")");
	        //	console.dir(nightlyRates);
	        for (var i = 0; i < nightlyRates.length; i++) {
	            var memberPrice = nightlyRates[i].memberPrice;
	            roomPrice = memberPrice;
	            var Date = nightlyRates[i].date;
	            Date = Date.substring(0, 10);
	            Date1 = Date.substring(5, 10);
	            var wek = getWeekDayStr(Date);

	            var addBedPrice = nightlyRates[i].addBedPrice;

	            var html = "<li class=\"liveDate\"><span>" + Date1 + "<b>" + wek + "</b></span><b class=\"rColor\">￥" + priceCarry(memberPrice) + "</b>/每间</li>";
	            $(".DateInfo").append(html);
	        }
	        var html1 = "<span>" + nightlyRates.length + "晚<b>|</b><span class=\"roomCount\">1</span>间<b class='Bprice'>房费<span class=\"rColor\">￥" + total + "</span></b>";
	        $(".singlePrice").html(html1);

	        $("#totalPrice").html(accAdd(total, serviceFee * nightlyRates.length));
	        var html2 = "<span></span><b class='price'>服务费：<span class=\"rColor\">￥" + serviceFee + "</span>间/夜</b>";
	        $(".otherDetail").html(html2);

	        //	var addBedPrice = nightlyRates[0].addBedPrice;
	        //		if(addBedPrice==-1){
	        //			var bed = "不提供加床服务";
	        //		}else{
	        //			var bed = "提供加床服务";
	        //		}
	        ////	var html2 = "<li>早餐：含早餐，单加早餐，每份¥38元。</li>";
	        //	var html2="<li>加床："+bed+"。</li>";
	        //		html2+="<li>支付方式：预订免费，入住后酒店前台付款。</li>";					
	        //	$(".otherDetail").html(html2);

	    }


	    //获取审批人并显示
	    function getAuditing() {
	        $.doAjax({
	            url: "/corp/auditing/default/person",
	            type: 'get',
	            success: function(data) {
	                if (data.length != 0 || data !== null) {
	                    //  console.log('审批人信息',JSON.stringify(data));
	                    auditingPerson = data;
	                    auditingHtml(); //显示审批人
	                }
	            }
	        })
	    }

	    function NumAscSort(a, b) {
	        return a.auditingLevel - b.auditingLevel
	    }

	    function auditingHtml() {
	        if (auditingPerson.length != 0) {
	            //审批等级排序
	            auditingPerson.sort(NumAscSort);

	            var html = '';
	            html += '<p>*您需要经过如下领导的审批方可订票</p>';
	            for (var j = 0; j < auditingPerson.length; j++) {
	                var editStatus = '';
	                if (auditingPerson[j].isModify == 1) {
	                    editStatus = "editBtn";
	                }
	                if (j == auditingPerson.length - 1) {
	                    html += '<span class="auditingPerson ' + editStatus + '" data-seq="' + j + '">' + auditingPerson[j].userName + '</span>'
	                } else {
	                    html += '<span class="auditingPerson ' + editStatus + '" data-seq="' + j + '">' + auditingPerson[j].userName + '</span><img src="../../images/arrow-auditing.png">'
	                }
	            }
	            $('.auditingInfo').append(html);
	            $('.auditing').removeClass('hidden');
	            $('.auditingP').removeClass('hidden');
	        } else {
	            var html = '<p style="padding-top: 15px;">您的订单需要经过领导审批，请联系管理设置审批人！</p>';
	            $('.auditingInfo').append(html);
	            $('.auditing').removeClass('hidden');
	            $('.auditingP').removeClass('hidden');
	        }
	    }


	    editApprover(); // 编辑审批人
	    //确定审批人
	    $("#btnEditApprover").on({
	        click: function() {
	            // 循环确认具体审批人
	            $("#userlist1 li").each(function() {
	                if ($(this).hasClass("selectd")) {
	                    var data = JSON.parse($(this).attr("data-rows"));
	                    auditingData = JSON.parse($(this).attr("data-rows")); /* 保存所选的审批人信息 */
	                    var index = $("#seq").val();
	                    for (var key in data) {

	                        if (data.hasOwnProperty(key) && data[key]) {
	                            auditingPerson[index][key] = data[key];
	                        }
	                    }
	                    $(".auditingInfo").html("");
	                    auditingHtml(); //显示审批人
	                }
	            });
	        }
	    });

	    //编辑审批人
	    function editApprover() {
	        $(document).on("click", '.editBtn', function() {
	            $("#seq").val($(this).attr("data-seq"));
	            $("#selectUser").modal("show");
	        });
	    }



	    // 查询当前用户可用支付方式
	    getPayWay();

	    // 查询当前用户可用支付方式
	    function getPayWay() {
	        $.doAjax({
	            url: '/payway',
	            err: function(err) {
	                layer.alert('获取支付方式失败');
	            },
	            success: function(data) {
	                if (data.paramValue == '1') {
	                    $('#weixin').remove();
	                    $('#zhifubao').addClass("action");
	                    $("#select_pay_btn").attr("data-pay", '1');
	                } else if (data.paramValue == '5') {
	                    $('#zhifubao').remove();
	                    $('#weixin').addClass("action");
	                }
	            }
	        })
	    }




	    //显示明细
	    $(".detailShow").click(function(e) {
	        e.stopPropagation(); //阻止事件冒泡
	        $(".detailInfo").toggleClass("hidden");

	        if ($(".detailInfo").hasClass("hidden")) {
	            $(this).children("i").removeClass("fa-sort-up").addClass("fa-sort-down");
	        } else {
	            $(this).children("i").removeClass("fa-sort-down").addClass("fa-sort-up");
	        }
	    });
	    //全局点击隐藏明细
	    $(document).click(function() {

	        if (!$(".detailInfo").hasClass("hidden")) {
	            $(".detailShow").children("i").removeClass("fa-sort-up").addClass("fa-sort-down");
	            $(".detailInfo").toggleClass("hidden");
	        }
	    });

	    //确认订单
	    $('#confirmBtn').click(function() {
	        var pass = true;
	        var Name = $("#customers li.pas input[type=text]");
	        for (var i = 0; i < Name.length; i++) {
	            var val = Name.eq(i).val();
	            if (val == "" || val == undefined || val == null) {
	                pass = false;
	                dialogHTML("房间住客姓名不能为空");
	                return false;
	            }
	        }
	        var contactName = $("#contactName").val();
	        var contactPhone = $('#contactPhone').val();
	        if (contactName == "" || contactName == undefined || contactName == null) {
	            $("#contactName").next("span").removeClass("hidden");
	            pass = false;
	            return false;
	        } else {
	            $("#contactName").next("span").addClass("hidden");
	        }

	        if (!isphone(contactPhone)) {
	            $("#contactPhone").next("span").html("*请输入正确的手机号");
	            pass = false;
	            return false;
	        } else {
	            $("#contactPhone").next("span").html("*订单信息将发送短信给联系人");
	        }

	        /**
	         * 乘客是员工的情况下，并且因公出差，若违反差旅政策，需要填写原因
	         */
	        $("input[name='customerNames']", "#customers").each(function(index) {
	            var userId = $(this).attr("userId");
	            var policy = $("#policyOver_" + userId);
	            if (policy.length > 0) {

	                if ($(".way_to_reason").val() == "") {
	                    dialogHTML("请选择违规原因！");
	                    pass = false;
	                    return false;
	                }
	            }
	        });


	        if (pass) {
	            $(".confirmSlNum,.slNum").toggleClass("hidden");
	            $("#customers,#customers1").toggleClass("hidden");
	            $(".linkManinfo,.linkManinfo1").toggleClass("hidden");
	            $(".carPrev,.carPrev1").toggleClass("hidden");
	            $("#dueBtn,#confirmBtn").toggleClass("hidden");

	            $("input[name='customerNames']", "#customers").each(function(index) {
	                var userId = $(this).attr("userId");
	                var policy = $("#policyOver_" + userId);
	                if (policy.length > 0) {
	                    $(".rule_ect").addClass("hidden");
	                    $(".policy_info_check").removeClass("hidden");
	                }
	            });

	            $('.takeHotelInfo1 ul').html("");
	            var cus = $(".takeHotelInfo li.pas");
	            //确认添加房间数
	            for (var i = 0; i < cus.length; i++) {
	                var inp = cus.eq(i).children("input[type=text]");
	                var name = inp.val();
	                var userId = inp.attr("userId");
	                var passengerId = inp.attr("passengerId");
	                var idcardCode = inp.attr("idcardCode");
	                var idcardType = inp.attr("idcardType");

	                $('.takeHotelInfo1 ul').append("<li><label for=\"\">房间" + (i + 1) + "：</label><b userId='" + userId + "'" +
	                    " passengerId='" + passengerId + "' idcardType='" + idcardType + "' idcardCode='" + idcardCode + "'>" + name + "</b></li>");
	            }
	            //联系人确认
	            $('#contactName1').html($("#contactName").val());
	            $('#contactPhone1').html($("#contactPhone").val());
	            $(".confirmSlNum .restRoom1").html(cus.length + "间");
	            //日期确认
	            $("#arrivalDate1").html($("#arrivalDate").html());
	            $("#departureDate1").html($("#departureDate").html());
	            $(".dateDiv2 .week1").html($(".dateDiv .week1").html());
	            $(".dateDiv2 .week2").html($(".dateDiv .week2").html());
	            $(".dateDiv2 .stayDays").html($(".dateDiv .stayDays").html());
	            $('.confirmArrTime').text($(".lastArrTime select option:selected").text());



	            //审批人
	            var auditingHtml = "";
	            for (var k = 0; k < auditingPerson.length; k++) {
	                auditingHtml += "<li>审批人姓名:<span class='auditing_name_check'>" + auditingPerson[k].userName + "</span>电话:<span class='auditing_phone_check' >" + auditingPerson[k].phone + "</span></li>"
	            }
	            $(".auditingInfo1").removeClass("hidden");
	            $(".auditingInfo1 ul").html(auditingHtml);
	            $(".auditingInfo").addClass("hidden");


	            //审批
	            if (isOpenAudit == '1') {
	                $("#dueBtn").text('提交审批')
	            }

	            /**
	             * 违规信息
	             */
	            var policyHtml = "<br/>";
	            $("input[name='customerNames']", "#customers").each(function(index) {

	                var passengerUserId = $(this).attr("userId");
	                var passengerName = $(this).val();

	                $(".policy_info_check ul").html("");
	                var policy = $("#policyOver_" + passengerUserId);
	                if (policy.length > 0) {
	                    policyHtml += "<li><div>" + passengerName + "</div>";

	                    policy.children("div").children("p").each(function(i) {
	                        var over = {};
	                        var info = $(this).children();

	                        over.passengerUserId = passengerUserId;
	                        over.policyId = $(this).attr("policyId");
	                        over.itemId = $(this).attr("itemId");
	                        over.factInfo = info.last().text();
	                        over.overContent = info.first().text();
	                        over.overReason = $(".way_to_reason").find("option:selected").text();
	                        // policyOvers.push(over);

	                        policyHtml += "<div>" + over.factInfo + "," + over.overContent + "</div>";
	                    });
	                    policyHtml += "</li>";
	                }

	            });
	            if (policyHtml != "") {
	                //违规
	                policyHtml += "<li><div><p>违规原因：" + $(".way_to_reason").find("option:selected").text() + "</p></div><li>";
	            } else {
	                policyHtml = "<li><div><p>无违规</p></div><li>";
	            }
	            $(".policy_info_check ul").html(policyHtml);

	        }

	        $("#jindu").children('div').eq(2).addClass("sec_bgc");

	    });
	    //返回重选
	    $('.carPrev1').click(function() {
	        $(".confirmSlNum,.slNum").toggleClass("hidden");
	        $("#customers,#customers1").toggleClass("hidden");
	        $(".linkManinfo,.linkManinfo1").toggleClass("hidden");
	        $(".carPrev,.carPrev1").toggleClass("hidden");
	        $("#dueBtn,#confirmBtn").toggleClass("hidden");
	        $(".auditingInfo1").addClass("hidden");
	        $(".auditingInfo").removeClass("hidden");
	        $("#jindu").children('div').eq(2).removeClass("sec_bgc");

	        $("input[name='customerNames']", "#customers").each(function(index) {
	            var userId = $(this).attr("userId");
	            var policy = $("#policyOver_" + userId);
	            if (policy.length > 0) {
	                $(".rule_ect").removeClass("hidden");
	                $(".policy_info_check").addClass("hidden");
	            }
	        });
	    })



	    //提交订单
	    //	$("#dueBtn").click(function(){
	    ////		askHTML('是否确认提交订单');
	    //
	    //	});
	    $("#yuliuAlert .confirm").click(function() {
	        //$("#yuliuAlert .tip_content").addClass("hidden");
	        //$("#yuliuAlert .loadIng").removeClass("hidden");


	        /* 当前弹窗影藏 */
	        $("#yuliuAlert").modal("hide");

	        var payTypeNum = $("#dueBtn").attr("data-hotelpaytype");
	        if (payTypeNum == "1") { /* 个人支付 */
	            /* 个人支付 */
	            if (isOpenAudit == "1") { //需要审批
	                approvalSubmit();
	            } else { //不需要审批
	                /* 唤起选择支付弹窗*/
	                $('#selectPay').modal("show");
	                /* 选择支付弹窗 数据渲染 */
	                $("#total-amount").html("￥" + $("#totalPrice").text());
	                $("#selectPay .cont_title").html("酒店<span>" + $('.hotelName').text() + "</span>");
	                var html = "<li><span class='one'>房费</span><span class='two'>" + $(".singlePrice .Bprice .rColor").text() + "</span></li>" +
	                    "<li><span class='one'>服务费</span><span class='two'>" + $(".otherDetail .price .rColor").text() + "</span><span class='three'>间/夜</span></li>";
	                $("#selectPay .cont_list").html(html);
	                $("#select_pay_btn").unbind("click");
	                $("#select_pay_btn").click(function() {
	                    payFun(payTypeNum);
	                })
	            }
	        } else {
	            //审批
	            if (isOpenAudit == "1") {
	                approvalSubmit();
	            } else {
	                payFun(payTypeNum);
	            }
	        }
	    })


	    function payFun(payTypeNum) {
	        var ids = $(".hotelDetaile p.hidden");
	        var data = {};
	        data.hotelCode = ids.attr("hotelCode");
	        data.roomCode = ids.attr("roomCode");
	        data.ratePlanCode = ids.attr("ratePlanCode");
	        data.arrivalDate = $("#arrivalDate").text().trim();
	        data.departureDate = $("#departureDate").text().trim();
	        data.roomCount = $("#roomCount").text();
	        data.customerCount = $("#customers li.pas").length;
	        data.totalPrice = $("#totalPrice").text();
	        data.contactName = $("#contactName").val();
	        data.contactPhone = $("#contactPhone").val();
	        data.latestArrivalTime = $("#arrivalDate").text().trim() + " " + $(".confirmArrTime").text();
	        data.channelId = hotelInfo.channelId;
	        data.roomTypeCode = hotelInfo.roomTypeCode;
	        data.isPrivate = "0"; /*是否因私 1是 0否  */
	        data.payType = hotelInfo.payType;
	        data.invoiceMode = hotelInfo.invoiceMode;

	        if (payTypeNum == "1") {
	            var payWayNum = $("#select_pay_btn").attr("data-pay");
	            if (payWayNum == "2") { //微信支付临时修改参数
	                payWayNum = "3";
	            }
	            data.payWay = payWayNum;
	            data.isPrivate = "1"; /*是否因私 1是 0否  */
	        }


	        var customerInfo = [];
	        $("#customers1 li b").each(function() {
	            var customers = {};
	            customers.name = $(this).html();
	            customers.userId = $(this).attr("userId");
	            customers.passengerId = $(this).attr("passengerId");
	            var passengerUserId = $(this).attr("userId");
	            if (customers.passengerId != undefined) {
	                customers.passengerId = customers.passengerId;
	            }
	            customers.idcardType = $(this).attr("idcardType");
	            customers.idcardCode = $(this).attr("idcardCode");

	            var policy = $("#policyOver_" + passengerUserId);
	            var policyOver = [];
	            policy.children("div").children("p").each(function(i) {
	                var over = {};
	                var info = $(this).children();

	                over.passengerUserId = passengerUserId;
	                over.policyId = $(this).attr("policyId");
	                over.itemId = $(this).attr("itemId");
	                over.factInfo = info.last().text();
	                over.overContent = info.first().text();
	                over.overReason = $(".way_to_reason").find("option:selected").text();
	                policyOver.push(over);

	            });

	            customers.policyOvers = policyOver;
	            customerInfo.push(customers);
	        });

	        data.customerInfo = customerInfo;

	        var corpId = userInfo.corpId;
	        var corpUserId = userInfo.userId;
	        var params = {};
	        params.hotelOrderParams = data;
	        //console.log(JSON.stringify(params));
	        //$("#cancelDialog").modal("show");
	        $("#yuliuAlert").hide();
	        var img = $("#progressImgage");
	        img.removeClass("hide");
	        $.doAjax({
	            type: "post",
	            url: "/hotel/order/add",
	            data: JSON.stringify(params),
	            async: true,
	            success: function(data) {
	                //					img.addClass("hide");
	                //					document.getElementById("loadbg").style.display ="none";
	                if (data.resultCode == 6) {
	                    //						dialogPay(data.orderId, data.orderNumber, 2);
	                    if (payWayNum == "1") {
	                        window.location.href = data.payParams;
	                    } else if (payWayNum == "3") {
	                        var wx_Data = {};
	                        wx_Data.codeUrl = data.payParams;
	                        wx_Data.orderNumber = [];
	                        wx_Data.orderNumber[0] = data.orderNumber;
	                        wx_Data.price = data.totalPrice;
	                        wx_Data.boss = '飞巴商旅';
	                        wx_Data.ticketType = 2;
	                        wx_Data.orderId = [];
	                        wx_Data.orderId[0] = data.orderId;
	                        //console.log(JSON.stringify(wx_Data))
	                        window.localStorage.setItem('wx_Data', JSON.stringify(wx_Data));
	                        window.location.href = '/page/weixinPay';
	                    }
	                } else if (data.resultCode == 1) {
	                    location.href = '/hotel/hotelBookingSuccess?orderNumber=' + data.orderNumber + '&orderId=' + data.orderId + "&isOpenAudit=" + isOpenAudit;
	                }
	            },
	            error: function(err) {
	                img.addClass("hide");
	                document.getElementById("loadbg").style.display = "none";
	                //$("#cancelDialog").modal("hide");
	                $("#showAlert").next().remove();
	                dialogHTML(err.message);
	            }
	        })
	    }


	    function approvalSubmit() {

	        var img = $("#progressImgage");
	        img.removeClass("hide");
	        var userObj = {};
	        var userArr = [];
	        var name = [];
	        // for(var i=0;i< $("#customers .pas input").length;i++){
	        // 	name.push($("#customers .pas input").eq(i).val());
	        // 	userObj.name = $("#customers .pas input").eq(i).val();
	        // 	userObj.userId = $("#customers .pas input").eq(i).attr("userid");
	        // 	userObj.idcardType = $("#customers .pas input").eq(i).attr("idcardType");
	        // 	userObj.idcardCode = $("#customers .pas input").eq(i).attr("idcardCode");
	        // 	var passengerUserId = $("#customers .pas input").eq(i).attr("userId");
	        // 	var policy = $("#policyOver_" + passengerUserId);
	        // 	var policyOver = [];
	        // 	policy.next().children("p").each(function (i) {
	        // 		var over = {};
	        // 		var info = $(this).children();
	        //
	        // 		over.passengerUserId = passengerUserId;
	        // 		over.policyId = $(this).attr("policyId");
	        // 		over.itemId = $(this).attr("itemId");
	        // 		over.factInfo = info.last().text();
	        // 		over.overContent = info.first().text();
	        // 		over.overReason = $(".way_to_reason").find("option:selected").text();
	        // 		policyOver.push(over);
	        // 	});
	        // 	userObj.policyOvers = policyOver;
	        // 	userArr.push(userObj);
	        // }
	        var customerInfo = [];
	        $("#customers1 li b").each(function() {
	            var customers = {};
	            customers.name = $(this).html();
	            customers.userId = $(this).attr("userId");
	            customers.passengerId = $(this).attr("passengerId");
	            var passengerUserId = $(this).attr("userId");
	            if (customers.passengerId != undefined) {
	                customers.passengerId = customers.passengerId;
	            }
	            customers.idcardType = $(this).attr("idcardType");
	            customers.idcardCode = $(this).attr("idcardCode");

	            var policy = $("#policyOver_" + passengerUserId);
	            var policyOver = [];
	            policy.children("div").children("p").each(function(i) {
	                var over = {};
	                var info = $(this).children();

	                over.passengerUserId = passengerUserId;
	                over.policyId = $(this).attr("policyId");
	                over.itemId = $(this).attr("itemId");
	                over.factInfo = info.last().text();
	                over.overContent = info.first().text();
	                over.overReason = $(".way_to_reason").find("option:selected").text();
	                policyOver.push(over);

	            });

	            customers.policyOvers = policyOver;
	            userArr.push(customers);
	        });
	        /* 转换nightlyRates数据格式*/
	        var nightlyRates = eval("(" + hotelInfo.nightlyRates + ")");
	        var hotelData = hotelInfo;
	        hotelData.coverImageUrl = $("#hotelImg").attr("src");
	        hotelData.nightlyRates = nightlyRates;
	        var data = {};
	        var dataHotel = {};
	        dataHotel.hotelCode = hotelInfo.hotelCode;
	        dataHotel.roomCode = hotelInfo.roomCode;
	        dataHotel.ratePlanCode = hotelInfo.ratePlanCode;
	        dataHotel.roomTypeCode = hotelInfo.roomTypeCode;
	        dataHotel.arrivalDate = hotelInfo.arrivalDate;
	        dataHotel.departureDate = hotelInfo.departureDate;
	        dataHotel.roomCount = $("#roomCount").text(); //房间数量
	        dataHotel.customerCount = $("#customers .pas").length;
	        dataHotel.totalPrice = $("#totalPrice").text(); //总价
	        dataHotel.customerInfo = userArr;
	        dataHotel.contactName = $("#contactName").val();
	        dataHotel.contactPhone = $("#contactPhone").val();
	        dataHotel.latestArrivalTime = $("#arrivalDate").text().trim() + " " + $(".confirmArrTime").text(); //最晚到店时间
	        dataHotel.hotelName = hotelInfo.hotelName;
	        dataHotel.channelId = hotelInfo.channelId;
	        dataHotel.bedType = hotelInfo.bedType;
	        dataHotel.roomName = hotelInfo.roomName;
	        dataHotel.capacity = hotelInfo.capcity;
	        dataHotel.cancellationPolicy = hotelInfo.cancellationPolicy;
	        dataHotel.payType = hotelInfo.payType;
	        dataHotel.isPrivate = "0";
	        dataHotel.invoiceMode = hotelInfo.invoiceMode;
	        dataHotel.hotelData = hotelData;



	        data.totalAmount = $("#totalPrice").text(); //订单总额
	        data.travelName = name.join(",");
	        data.auditingPersonParams = auditingPerson;
	        data.businessType = 2; //审核订单业务类型，1--机票订单下单，3--火车票，2--酒店时不为空，4--用车时不为空
	        data.hotelOrderParams = dataHotel;
	        //console.log(data);
	        $.doAjax({
	            url: '/corp/auditing/order/submit',
	            type: 'post',
	            data: JSON.stringify(data),
	            error: function(err) {
	                //console.log(err)
	                img.addClass("hide");
	                document.getElementById("loadbg").style.display = "none";
	                layer.alert(err.message);
	            },
	            success: function(data) {
	                //console.log(data);
	                img.addClass("hide");
	                document.getElementById("loadbg").style.display = "none";
	                var data = eval(data);
	                window.location.href = "/hotel/hotelBookingSuccess?orderId=" + data.orderId + "&orderNumber=" + data.orderId + "&result=" + data.result + "&type=2&isOpenAudit=" + isOpenAudit;
	            }
	        });


	    }

	    //修改日期
	    $('#dateBtn').click(function() {

	        var arrDate = $("#arrDate").val();
	        var leaDate = $("#leaDate").val();
	        if (arrDate == "" || arrDate == null || arrDate == undefined) {
	            dialogHTML("入店日期不能为空");
	            return false;
	        } else if (leaDate == "" || leaDate == null || leaDate == undefined) {
	            dialogHTML("离店日期不能为空");
	            return false;
	        } else {

	            var param = {};
	            param.arrivalDate = arrDate
	            param.departureDate = leaDate
	            param.hotelId = hotelId;
	            param.hotelCode = hotelCode;
	            param.personNumber = 1;
	            param.roomCode = roomCode;
	            param.ratePlanCode = ratePlanCode;
	            param.channelId = hotelInfo.channelId;
	            //		console.dir(param);
	            onloadHotelRooms(param);
	        }

	    })



	    //---------------------修改日期查询房间
	    function onloadHotelRooms(param) {
	        $.doAjax({
	            type: "get",
	            url: "/hotel/serch/detail",
	            data: param,
	            error: function(err) {
	                //dialogHTML(err.message);			
	            },
	            success: function(data) {
	                console.dir(data)
	                var rooms = data.rooms; //房间
	                if (rooms.length == 0) {
	                    dialogHTML("没有空余房间请您修改日期或房型");
	                } else {
	                    //绑定修改住店日期
	                    var arrDate = $("#arrDate").val();
	                    var leaDate = $("#leaDate").val();
	                    $('#arrivalDate').html(arrDate);
	                    $('#departureDate').html(leaDate);
	                    var week1 = getWeekDayStr(arrDate);
	                    var week2 = getWeekDayStr(leaDate);
	                    $('.dateDiv .week1').html(week1);
	                    $('.dateDiv .week2').html(week2);
	                    //获取当前选择房间数
	                    var roomCount = $('#roomCount').html();

	                    var ratePlans;
	                    for (var i = 0; i < rooms.length; i++) {
	                        console.dir(rooms[i].roomCode);
	                        console.dir(param.roomCode);
	                        console.dir('=============');
	                        if (rooms[i].roomCode == param.roomCode) {
	                            ratePlans = rooms[i].ratePlans;
	                            break;
	                        }
	                    }
	                    if (!ratePlans) {
	                        dialogHTML("没有空余房间请您修改日期或房型");
	                    }
	                    var ratePlan;
	                    for (var i = 0; i < ratePlans.length; i++) {
	                        if (ratePlans[i].ratePlanCode == param.ratePlanCode) {
	                            ratePlan = ratePlans[i];
	                            break;
	                        }
	                    }
	                    //				var ratePlans = rooms[0].ratePlans;
	                    var nightlyRate = ratePlan.nightlyRates;
	                    var stayDays = nightlyRate.length;
	                    //修改总金额为进1后的单价*天数
	                    total = priceCarry(ratePlan.averageRate) * stayDays;
	                    //total = ratePlan.totalRate;//总额
	                    $(".stayDays").html(stayDays);

	                    //明细
	                    //每日价格
	                    console.dir(nightlyRate);
	                    $(".DateInfo").html("");
	                    for (var i = 0; i < nightlyRate.length; i++) {
	                        var memberPrice = nightlyRate[i].memberPrice;
	                        roomPrice = memberPrice;
	                        var Date = nightlyRate[i].date;
	                        Date = Date.substring(0, 10);
	                        Date1 = Date.substring(5, 10);
	                        var wek = getWeekDayStr(Date);

	                        var addBedPrice = nightlyRate[i].addBedPrice;

	                        var html = "<li class=\"liveDate\"><span>" + Date1 + "<b>" + wek + "</b></span><b class=\"rColor\">￥" + priceCarry(memberPrice) + "</b>/每间</li>";
	                        $(".DateInfo").append(html);
	                    }


	                    var html1 = "<span>" + nightlyRate.length + "晚<b>|</b><span class=\"roomCount\">" + roomCount + "</span>间<b class='Bprice'>房费<span class=\"rColor\">￥" + total * roomCount + "</span></b>";
	                    $("#totalPrice").html(accAdd(total * roomCount, serviceFee * roomCount * nightlyRate.length));
	                    var html2 = "<span></span><b class='price'>服务费：<span class=\"rColor\">￥" + serviceFee + "</span>间/夜</b>";
	                    $(".otherDetail").html(html2);
	                    $(".singlePrice").html(html1);

	                    //				var addBedPrice = nightlyRate[0].addBedPrice;
	                    //					if(addBedPrice==-1){
	                    //						var bed = "不提供加床服务";
	                    //					}else{
	                    //						var bed = "提供加床服务";
	                    //					}
	                    //			//	var html2 = "<li>早餐：含早餐，单加早餐，每份¥38元。</li>";
	                    //				var html2="<li>加床："+bed+"。</li>";
	                    //					html2+="<li>支付方式：预订免费，入住后酒店前台付款。</li>";					
	                    //				$(".otherDetail").html(html2);

	                    checkPolicyOver();
	                }


	            }
	        });
	    }


	    var isIndividual = userInfo.isIndividual;
	    // -------------------------------------------------------------选择出行人--------------------

	    selectedUser();

	    // * 是否散客，1是散客
	    // selectedUser();//初始化员工选择界面
	    // getPassengerList(); //获取历史出行人

	    /**
	     * 新增出行人确定按钮事件
	     */
	    $("#passengerModalConfirmButton").click(function() {
	        // 将选择的出行人加载到主界面
	        var len = $(".takeHotelInfo ul li.pas");
	        len.children("input").val("").attr('userid', '').attr('passengerid', '');
	        //清空input 中 userId的属性
	        $("input[name='customerNames']", "#customers").each(function(index) {
	            $(this).removeAttr("userId");
	        });
	        $("#userlist li").each(function(index, item) {

	            var name = $(this).attr("pname");
	            var passengerId = $(this).attr("passengerId");
	            var idcardCode = $(this).attr("idcardCode");
	            var idcardType = $(this).attr("idcardType");
	            var userId = $(this).attr("userId");
	            var cardEndTime = $(this).attr("cardEndTime");
	            var phone = $(this).attr("phone");
	            var flightPassengerName = name;
	            var has = false;
	            // var html = "<li class='pas'><label>房间"+(index+1)+"：</label><input
	            // type=\"text\" name=\"customerNames\" value="+name+"
	            // disabled=\"disabled\" placeholder=\"请选择\"/></li>";
	            // $(".takeHotelInfo ul").append(html);
	            var inp = len.eq(index).children("input");
	            inp.val(name);
	            inp.attr("passengerId", passengerId);
	            inp.attr("userId", userId);
	            inp.attr("idcardType", idcardType);
	            inp.attr("idcardCode", idcardCode);
	            // $(".takeHotelInfo ul
	            // li").children("input[type=text]").eq(index).val(name);

	            // $("#userinfolist").find(".or_border").each(function(){
	            // if($(this).find("input[name='passengerName']").val()==name
	            // &&$(this).find("input[name='idcardCode']").val()==idcardCode
	            // &&$(this).find("select[name='idcardType']").val()==idcardType)
	            // {
	            // has = true;
	            // }
	            // });

	            // if(!has){
	            // //将主界面中不存在的出行人加载
	            // createPassengerInfo(passengerId,userId,name,idcardType,idcardCode,cardEndTime,phone,flightPassengerName);
	            // 主界面选择框选中
	            //setHistoryPassengerSelected(true,name,idcardType,idcardCode);
	            //		    	
	            // //更新价格
	            // totalPrice();
	            // }

	        });

	        // 房间数量与价格更新
	        var len1 = $(".takeHotelInfo ul li.pas").length;
	        $("#roomCount").html(len1);
	        $('#cusNum').html(len1);
	        var totalPrice = total * len1;
	        var day = $(".stayDays").html();
	        $("#totalPrice").html(accAdd(totalPrice, serviceFee * day * len1));
	        var html2 = "<span></span><b class='price'>服务费：<span class=\"rColor\">￥" + serviceFee + "</span>间/夜</b>";
	        $(".otherDetail").html(html2);
	        $(".Bprice span").html("￥" + totalPrice);
	        $(".roomCount").html(len1);
	        $(".Bprice span").html("￥" + total * len1)

	        //检查差旅政策
	        checkPolicyOver();

	        // 关闭界面
	        $("#addtestPassenger").modal("hide");

	    });

	    // 得到历史出行人（）
	    function getPassengerList() {
	        var userId = userInfo.userId;
	        var corpId = userInfo.corpId;
	        var data1 = {
	            "name": ""
	        };
	        $.doAjax({
	            type: "get",
	            url: "/tmc/passenger/list/" + userId + "/" + corpId,
	            data: data1,
	            success: function(data) {
	                var jsondata = eval(data);
	                var html = "";

	                var index = 1;
	                $.each(jsondata, function(i, info) {

	                    if (index < 9) {
	                        var passengerId = info.passengerId == null ? "" :
	                            info.passengerId;
	                        var userId = info.passengerUserId == null ? "" :
	                            info.passengerUserId;
	                        var cardEndTime = info.cardEndTime == null ? "" :
	                            getSmpFormatDateByLong(info.cardEndTime);
	                        var name = info.name;
	                        var idcardCode = info.idcardCode;
	                        var idcardType = info.idcardType;
	                        var phone = info.userPhone == null ? "" :
	                            info.userPhone;
	                        var flightPassengerName = name;
	                        // 历史出行人肯定有passengerId，所有这里可以用passengerId作为唯一关联
	                        html += "<li passengerId='" + passengerId +
	                            "' cardEndTime='" + cardEndTime + "' phone='" +
	                            phone + "' pname='" + name +
	                            "' flightPassengerName='" +
	                            flightPassengerName + "' idcardCode='" +
	                            idcardCode + "' idcardType='" + idcardType +
	                            "' userId='" + userId + "' >" +
	                            "<span class='name'>" + flightPassengerName +
	                            getPassengerType(info.passengerUserId) +
	                            "</span>" + "</li>";

	                        index++;
	                    }

	                });
	                $("#historylist").append(html);
	                if (isIndividual == 1) // 如果是散客
	                {

	                    // 主界面选择框选中
	                    $("#historylist li").each(
	                        function() {
	                            if ($(this).attr("userid") == userInfo.userId) {
	                                $(this).addClass("active");
	                                createPassengerInfo($(this).attr(
	                                        "passengerId"), $(this).attr(
	                                        "userId"), $(this).attr("pname"),
	                                    $(this).attr("idcardType"), $(this)
	                                    .attr("idcardCode"),
	                                    $(this).attr("cardEndTime"),
	                                    userInfo.userPhone, $(this).attr(
	                                        "flightPassengerName"));
	                                totalPrice(); // 更新机票价格
	                            }
	                        });
	                    // createPassengerInfo(passengerId,passengerUserId,name,idcardType,idcardCode);
	                }
	            }
	        })
	    }

	    // 出行人后缀
	    function getPassengerType(userId) {
	        var str = "";
	        if (isIndividual == 1) {
	            // 散客
	            str = "（散客）";
	        } else {
	            if (userId == null || userId == "") {
	                str = "（非员工）";
	            }
	        }
	        return str;
	    }

	    // 初始化员工列表
	    function selectedUser(num) {

	        // 、、、、、、判断预订人是否散客，如果是散客，则隐藏员工
	        // $('#addPassenger').on('show.bs.modal', function () {
	        // //初始化界面数据
	        // if(isIndividual==1)//散客
	        // {
	        // $("#isUser").addClass("hide");
	        // $("#staffRdo").addClass("hide");//员工
	        // $("#checkuser").addClass("hidden");
	        // $(".not_staff_add").removeClass("hidden");
	        // $("#notUser").removeClass("fa-circle-o").addClass("fa-dot-circle-o");
	        // //非员工
	        // $("#searchUserType").val("2");
	        // $("#fitRdo").html("散客");
	        // $("#lin").addClass("hidden");
	        // $("#yuan").addClass("hidden");
	        // searchNotUser();
	        //						
	        // }
	        // else
	        // {
	        // $("#san").addClass("hidden");
	        // searchUser();
	        // }
	        //
	        // });
	        // 添加旅客加载弹出框（2016.11.16）-----------------------------------------------------------
	        $('#addtestPassenger').on('show.bs.modal', function() {
	            // 初始化界面数据
	            if (isIndividual == 1) {
	                $("#corpCheckName").addClass("hidden");
	                // 非员工
	                $("#searchUserType").val("2");
	                $("#fitRdo").html("临客");
	                $("#yuan").addClass("hidden");
	                $("#san").addClass("hidden");
	                $('#modalHeader').remove();
	                $(".userlist .notUser").removeClass('hidden');
	                $(".userlist .user").addClass('hidden');
	                searchNotUser();
	                //searchPerson("\"\"", 1, 0); // 加载散客
	            } else {
	                $("#isUser").removeClass("fa-circle-o").addClass(
	                    "fa-dot-circle-o");
	                $("#notUser").removeClass("fa-dot-circle-o").addClass(
	                    "fa-circle-o");
	                $("#san").addClass("hidden");
	                //载入员工和常用出行人列表
	                searchNotUser();
	                searchUser1();
	                //默认员工列表
	                $(".userlist .user").removeClass('hidden');
	                $(".userlist .notUser").addClass('hidden');
	            }

	        });
	        // 选择出行人（新的页面）-------------------------------------------------------------------------
	        $(document).on("click", "#checkuser ul li", function() {
	            var userId = $(this).attr("userId");
	            var passengerId = $(this).attr("passengerId");

	            var isOtherListCheck = true;
	            $("#userlist li").each(function() {
	                if (($(this).attr('userid') == passengerId && $(this).attr('userid') != '') || ($(this).attr('passengerId') == userId && $(this).attr('passengerId') != '')) {
	                    isOtherListCheck = false;
	                }
	            });
	            var len = $(".takeHotelInfo ul li.pas").length;
	            if (!$(this).hasClass("checked") && isOtherListCheck == true) {
	                var length = $("#userlist").children().length;
	                if (length < len) {
	                    var name = $(this).attr("pname");
	                    var idcardCode = $(this).attr("idcardCode");
	                    var idcardType = $(this).attr("idcardType");
	                    var cardEndTime = $(this).attr("cardEndTime");
	                    var phone = $(this).attr("phone");
	                    var flightPassengerName = name;
	                    var type = $("#searchUserType").val();
	                    var html = '<li userId="' + userId + '" pname="' +
	                        name + '" passengerId="' + passengerId +
	                        '" idcardCode="' + idcardCode +
	                        '" idcardType="' + idcardType +
	                        '" cardEndTime="' + cardEndTime +
	                        '" phone="' + phone +
	                        '" flightPassengerName="' +
	                        flightPassengerName + '">' +
	                        flightPassengerName + '</li>';
	                    if (type == 2) {
	                        html = '<li userId="' + userId + '" pname="' +
	                            name + '" passengerId="' +
	                            passengerId + '" idcardCode="' +
	                            idcardCode + '" idcardType="' +
	                            idcardType + '" cardEndTime="' +
	                            cardEndTime + '" phone="' + phone +
	                            '" flightPassengerName="' +
	                            flightPassengerName + '">' +
	                            flightPassengerName + '</li>'
	                    }
	                    $("#userlist").append(html);
	                    $(this).addClass("checked disabled");
	                }
	            }
	        });
	        // 删除出行人（新的页面）-----------------------------------------------------------------------------
	        $(document).on("click", "#userlist li", (function() {
	            var userid = $(this).attr("idcardcode");
	            if (!$(this).hasClass("disabled")) {
	                $("#checkuser ul li").each(function() {
	                    if ($(this).attr("idcardcode") == userid) {
	                        $(this).removeClass("checked disabled");

	                    }
	                });
	                $(this).remove();
	            }

	        }));
	        // 选择点击员工和非员工---------------------------------------------------------------------
	        $(".order_tip i").click(
	                function() {
	                    var id = $(this).attr("id")
	                    if (id == 'isUser') {
	                        $("#notUser").removeClass("fa-dot-circle-o").addClass(
	                            "fa-circle-o");
	                        $("#isUser").removeClass("fa-circle-o").addClass(
	                            "fa-dot-circle-o");
	                        $(".not_staff_add").addClass("hidden");
	                        $(".add_traveler_list").removeClass("hidden");
	                        staff = true;
	                        $("#searchUserType").val("1");
	                        $(".userlist .user").removeClass('hidden');
	                        $(".userlist .notUser").addClass('hidden');
	                        //searchUser1();

	                    } else if (id == "notUser") {
	                        $("#isUser").removeClass("fa-dot-circle-o").addClass(
	                            "fa-circle-o");
	                        $("#notUser").removeClass("fa-circle-o").addClass(
	                            "fa-dot-circle-o");
	                        $(".not_staff_add").removeClass("hidden");
	                        $(".add_traveler_list").addClass("hidden");
	                        staff = false;
	                        // 非员工
	                        $("#searchUserType").val("2");
	                        $(".userlist .notUser").removeClass('hidden');
	                        $(".userlist .user").addClass('hidden');
	                        //searchNotUser();
	                    }
	                })
	            // 添加临客-----------------------------------------------------------------------------
	        $("#btnsavelinUser").click(function() {
	            addPassenger();
	        });
	    }
	    // 查询员工
	    function searchUser1() {
	        // 员工
	        var corpId = userInfo.corpId;
	        var data = {};
	        data.userName = $("#searchName").val();
	        $.doAjax({
	            type: "get",
	            url: "/user/emplist", //
	            data: data,
	            success: function(data) {
	                var jsondata = eval(data);
	                var html = "",
	                    checHtml = "";

	                $.each(jsondata, function(i, info) {

	                    var userName = info.userName;
	                    var idcardCode = info.idcardCode == null ? "" :
	                        info.idcardCode;
	                    var idcardType = info.idcardType;
	                    var userId = info.userId;
	                    var cardEndTime = info.cardEndTime == null ? "" :
	                        info.cardEndTime;
	                    var phone = info.userPhone == null ? "" : info.userPhone;
	                    var flightPassengerName = userName;
	                    var cardCode = "";
	                    if (idcardCode != "") {
	                        cardCode = "(" + idcardCode + ")";
	                    }
	                    var disabled = "";
	                    var ischk = "";

	                    //首先判断是否主界面已经存在
	                    if (hasPassenger(userId)) {
	                        disabled = "disabled";
	                        ischk = 'checked';
	                        checHtml += '<li userid="' + userId + '" pname="' + userName + '" passengerid="" idcardcode="' + idcardCode + '" idcardtype="' + idcardType + '" cardendtime="' + cardEndTime + '" phone="' + phone + '" flightpassengername="' + flightPassengerName + '">' + flightPassengerName + '</li>';
	                    }
	                    // else{
	                    // //找到是否已经选中
	                    // if(isPassengerChecked(userName,idcardCode,idcardType)){
	                    // 	disabled = "disabled";
	                    // 	ischk='checked';
	                    // }}

	                    html += '<li class="' + disabled + ' ' + ischk +
	                        '" passengerId="" pname="' + userName +
	                        '"  cardEndTime="' + cardEndTime + '" phone="' +
	                        phone + '" idcardCode="' + idcardCode +
	                        '" idcardType="' + idcardType + '"  userId="' +
	                        userId + '" flightPassengerName="' +
	                        flightPassengerName + '">' + flightPassengerName +
	                        cardCode + '</li>';

	                });
	                $("#checkuser ul.user").html(html);
	                $("#userlist").html(checHtml);
	                // onintChecked();
	                // 注册选择事件
	                bindPassengerCheckUserEvent();
	            }
	        });
	    }
	    // 选择员工出行人
	    function bindPassengerCheckUserEvent() {
	        $("#checkuser input[type='checkbox']").each(function() {
	            $(this).click(function() {
	                bindPassengerCheckEvent($(this));
	            });
	        });
	    }

	    function hasPassenger(id) {
	        var has = false;
	        //主界面已经选中的出行人
	        $(".pas").each(function() {
	            if ($(this).find('input').attr('userid') == id || $(this).find('input').attr('passengerid') == id) {
	                //已经存在
	                has = true;
	            }
	        });
	        return has;
	    }

	    // 添加旅客弹出查询输入框事件（2016.11.16）-----------------------------------------------
	    $("#searchName").keyup(function() {
	        var v = $(this).val();
	        // if(v.length>0)
	        // {
	        if (isIndividual == 1) // 散客查询
	        {
	            searchPerson(v, 1, 1);
	        } else {
	            var userType = $("#searchUserType").val(); // 1,查员工，0，查临客
	            if (userType == 1) {
	                searchPerson(v, 0, 1); // 企业查询
	            } else {
	                searchNotUser();
	            }
	        }
	        // }
	    });

	    // 查询临客-----------------------------------------------------------------------------------------------------
	    function searchNotUser() {
	        // 非员工
	        var userId = userInfo.userId;
	        var corpId = userInfo.corpId;
	        var data = {};
	        data.passengerName = $("#searchName").val();
	        $.doAjax({
	            type: "get",
	            url: "/user/passenger/list",
	            data: data,
	            success: function(data) {
	                var jsondata = eval(data);
	                var html = "",
	                    checHtml = "";
	                //console.log(jsondata)

	                $.each(jsondata, function(i, info) {

	                    var name = info.name;
	                    var idcardCode = info.idcardCode == null ? "" :
	                        info.idcardCode;
	                    var idcardType = info.idcardType;
	                    var userId = info.passengerUserId == null ? "" :
	                        info.passengerUserId;
	                    var passengerId = info.passengerId == null ? "" :
	                        info.passengerId;
	                    var cardEndTime = info.cardEndTime == null ? "" :
	                        getSmpFormatDateByLong(info.cardEndTime);
	                    var phone = info.phone == null ? "" : info.phone;
	                    var flightPassengerName = name;
	                    var cardCode = "";
	                    if (idcardCode != "") {
	                        cardCode = "(" + idcardCode + ")";
	                    }
	                    if (info.isEmployee != 1 || isIndividual) {

	                        var disabled = "";
	                        var isChecked = "";
	                        var ischk = "";
	                        // //首先判断是否主界面已经存在，若已经存在，则不能修改，只能在主界面中删除
	                        // if(hasPassenger(name,idcardType,idcardCode)){
	                        // disabled = "disabled";
	                        // isChecked = "checked='checked'";
	                        // ischk='checked';
	                        // }else{
	                        // //找到是否已经选中
	                        // if(isPassengerChecked(name,idcardCode,idcardType)){
	                        // isChecked = "checked='checked'";
	                        // ischk='checked';
	                        // }
	                        // }
	                        //首先判断是否主界面已经存在
	                        if (hasPassenger(passengerId)) {
	                            disabled = "disabled";
	                            ischk = 'checked';
	                            checHtml += '<li userid="' + userId + '" pname="' + name + '" passengerid="' + passengerId + '" idcardcode="' + idcardCode + '" idcardtype="' + idcardType + '" cardendtime="' + cardEndTime + '" phone="' + phone + '" flightpassengername="' + name + '">' + name + '</li>';
	                        }
	                        // else{
	                        // //找到是否已经选中
	                        // if(isPassengerChecked(userName,idcardCode,idcardType)){
	                        // 	disabled = "disabled";
	                        // 	ischk='checked';
	                        // }}

	                        html += '<li  class="' + disabled + ' ' + ischk +
	                            '" passengerId="' + passengerId + '" phone="' +
	                            phone + '" cardEndTime="' + cardEndTime +
	                            '" pname="' + name + '" idcardCode="' +
	                            idcardCode + '" idcardType="' + idcardType +
	                            '" userId="' + userId +
	                            '" flightPassengerName="' +
	                            flightPassengerName + '">' +
	                            flightPassengerName + cardCode + '</li>';

	                    }
	                });
	                // $("#notuser_list").html(html);
	                $("#checkuser ul.notUser").html(html);
	                $("#userlist").append(checHtml);
	                // 注册选择事件
	                bindPassengerCheckNotUserEvent();
	            }
	        });
	    }

	    // 查询添加旅客企业员工(模糊查询)type:0.员工，1.散客,useType:1,查询用，0加载用（2016.11.16）-----------------------------------
	    function searchPerson(obj, type, useType) {
	        var userInfo1 = {};
	        var corpId = userInfo.corpId;
	        if (obj == "") {
	            obj = "\"\"";
	        }
	        userInfo1.userName = obj;
	        // userInfo1.isIndividual=type;
	        $.doAjax({
	            type: "get",
	            url: "/user/emplist",
	            data: userInfo1,
	            error: function(err) {

	            },
	            success: function(data) {
	                if (data != "" && data != null) {
	                    var jsondata = eval(data);
	                    var html = "";
	                    $.each(jsondata, function(i, info) {
	                        var userName = info.userName;
	                        var idcardCode = info.idcardCode;
	                        var idcardType = info.idcardType;
	                        var userId = info.userId;
	                        var phone = info.userPhone == null ? "" :
	                            info.userPhone;
	                        var cardEndTime = info.cardEndTime == null ? "" :
	                            info.cardEndTime;
	                        // var flightPassengerName =
	                        // info.flightPassengerName==null?"":info.flightPassengerName;
	                        var flightPassengerName = userName;
	                        var disabled = "";
	                        var ischk = ""
	                        var cardCode = "";
	                        if (idcardCode != "") {
	                            cardCode = "(" + idcardCode + ")";
	                        }
	                        // 加载列表
	                        if (useType == 0) {
	                            html += '<li class="' + disabled + ' ' + ischk +
	                                '" passengerId="" pname="' + userName +
	                                '"  cardEndTime="' + cardEndTime +
	                                '" phone="' + phone + '" idcardCode="' +
	                                idcardCode + '" idcardType="' +
	                                idcardType + '"  userId="' + userId +
	                                '" flightPassengerName="' +
	                                flightPassengerName + '" >' +
	                                flightPassengerName + cardCode + '</li>';
	                        } else {
	                            html += '<li class="' + disabled + ' ' + ischk +
	                                '" passengerId="" pname="' + userName +
	                                '"  cardEndTime="' + cardEndTime +
	                                '" phone="' + phone + '" idcardCode="' +
	                                idcardCode + '" idcardType="' +
	                                idcardType + '"  userId="' + userId +
	                                '" flightPassengerName="' +
	                                flightPassengerName + '" >' +
	                                flightPassengerName + cardCode + '</li>';

	                        }
	                    });
	                    $("#checkuser ul").html(html);
	                }

	            }
	        });
	    }

	    // 添加散客（2016.11.16）--------------------------------------------------------------------------------
	    var userIsExist = 0;

	    $("#btnsave")
	        .click(
	            function() {
	                userIsExist = 0
	                var tel = $("#AddTicketUserDialog #telnums").val();
	                var card = $("#AddTicketUserDialog #cards").val();
	                var name = $("#AddTicketUserDialog #names").val();
	                var cardtype = $(
	                        "#AddTicketUserDialog #cardsType option:checked")
	                    .val();
	                var date = $("#AddTicketUserDialog #validDate").val();
	                var birthDay = $("#AddTicketUserDialog #birthday")
	                    .val();
	                var gender = $(
	                        "#AddTicketUserDialog input[name='radioGender']:checked")
	                    .val();
	                if (name == "" || name == null) {
	                    $("#AddTicketUserDialog #errname").text("*姓名不能为空");

	                    return false;
	                } else {
	                    $("#AddTicketUserDialog #errname").text("");
	                }
	                if (!checkUsersName(name)) {
	                    return false;;
	                }
	                if (tel == "" || tel == null) {
	                    $("#AddTicketUserDialog #errtel").text("*手机号不能为空");
	                    return false;
	                } else if (!checkPhone1(tel)) {
	                    $("#AddTicketUserDialog #errtel").text("*手机号输入不正确");
	                    return false;
	                } else {
	                    $("#AddTicketUserDialog #errtel").text("");
	                }
	                if (card == "" || card == null) {
	                    $("#AddTicketUserDialog #errcard")
	                        .text("*证件号码不能为空");
	                    return false;
	                } else if (!isIdCardNo(card) && cardtype == 1) {
	                    $("#AddTicketUserDialog #errcard")
	                        .text("身份证号输入不正确");
	                    return false;
	                } else if (cardtype == 2 && card == "") {
	                    $("#AddTicketUserDialog #errcard").text("护照号输入不正确");
	                    return false;
	                } else if (!$("#AddTicketUserDialog #divUseDate")
	                    .hasClass("hidden") &&
	                    date == "") {
	                    $("#AddTicketUserDialog #errcard").text("");
	                    $("#AddTicketUserDialog #errdate")
	                        .text("证件有效期不能为空");
	                    return false;
	                } else if (!$("#AddTicketUserDialog #divBirthday")
	                    .hasClass("hidden") &&
	                    birthDay == "") {
	                    $("#AddTicketUserDialog #errBirthday").text("");
	                    $("#AddTicketUserDialog #errBirthday").text(
	                        "出生日期不能为空！");
	                    return false;
	                } else {
	                    $("#AddTicketUserDialog #errdate").text("");
	                    var cardEndTime = "";
	                    if ($("#AddTicketUserDialog #validDate").val() != null &&
	                        $("#AddTicketUserDialog #validDate")
	                        .val() != undefined) {
	                        cardEndTime = new Date(Date.parse($(
	                                "#AddTicketUserDialog #validDate")
	                            .val().replace(/-/g, "/")));
	                    }
	                    if (birthDay != "" || birthDay != null ||
	                        birthDay != undefined) {
	                        birthDay = new Date(Date.parse(birthDay
	                            .replace(/-/g, "/")));
	                    }
	                    var param1 = {};
	                    param1.userName = name;
	                    param1.userPhone = tel;
	                    param1.idcardCode = card;
	                    param1.idcardType = cardtype;
	                    param1.isIndividual = 1;
	                    param1.birthday = birthDay;
	                    param1.sex = gender;
	                    searchUser11(param1, 0, false)

	                    // 判断是否已添加
	                    if (userIsExist == 0) {
	                        var param = {};
	                        param.userName = name;
	                        param.userPhone = tel;
	                        param.idcardType = cardtype;
	                        param.idcardCode = card;
	                        param.cardEndTime = cardEndTime;
	                        $
	                            .doAjax({
	                                type: "post",
	                                url: "/tmc/corpuser/individual",
	                                data: JSON.stringify(param),
	                                contentType: "application/json",
	                                error: function(err) {
	                                    // console.log("添加散客报错"+err.message);
	                                },
	                                success: function(data) {
	                                    var jsondata = eval(data);
	                                    var html = "";
	                                    var check = true;
	                                    if (hasPassenger(name,
	                                            cardtype, card)) {
	                                        check = false;
	                                    } else {
	                                        // 找到是否已经选中
	                                        if (isPassengerChecked(
	                                                name, card,
	                                                cardtype)) {
	                                            check = false;
	                                        }
	                                    }
	                                    if (check) {

	                                        html = '<li userId="' +
	                                            jsondata.userId +
	                                            '" pname="' +
	                                            jsondata.userName +
	                                            '" passengerId="" idcardCode="' +
	                                            jsondata.idcardCode +
	                                            '" idcardType="' +
	                                            jsondata.idcardType +
	                                            '" cardEndTime="' +
	                                            cardEndTime +
	                                            '" phone="' +
	                                            jsondata.userPhone +
	                                            '" flightPassengerName="' +
	                                            jsondata.flightPassengerName +
	                                            '">' +
	                                            jsondata.flightPassengerName +
	                                            '</li>';
	                                        $("#userlist").html(html);
	                                        $("#checkuser ul").append(
	                                            html);
	                                    }

	                                    $('#AddTicketUserDialog')
	                                        .modal("hide");
	                                }
	                            })
	                    } else {
	                        $('#AddTicketUserDialog').modal("hide");
	                    }

	                }
	            });

	    // 查询散客是否存在(2016.11.16)------------------------------------------------------------------
	    function searchUser11(param, type, asy) {
	        $.ajax({
	            type: "get",
	            url: "/orderCorrelation/corp/user/list",
	            async: asy,
	            data: param,
	            error: function(XMLHttpRequest, textStatus, errorThrown) {
	                var ret = XMLHttpRequest.responseText;
	                var err = $.parseJSON(ret);
	                // alert(err.message);
	                //console.log(param)
	            },
	            success: function(data) {

	                var jsondata = eval(data);
	                var length = 0;
	                var html = "";
	                $
	                    .each(
	                        jsondata,
	                        function(index, userinfo) {
	                            length += 1;
	                            if (index == 0) {

	                                var check = true;
	                                if (hasPassenger(
	                                        userinfo.userName,
	                                        userinfo.idcardType,
	                                        userinfo.idcardCode)) {
	                                    check = false;
	                                } else {
	                                    // 找到是否已经选中
	                                    if (isPassengerChecked(
	                                            userinfo.userName,
	                                            userinfo.idcardCode,
	                                            userinfo.idcardType)) {
	                                        check = false;
	                                    }
	                                }
	                                if (check) {
	                                    var cardEndTime = userinfo.cardEndTime == null ? "" :
	                                        getSmpFormatDateByLong(userinfo.cardEndTime);
	                                    html = '<li userId="' +
	                                        userinfo.userId +
	                                        '" pname="' +
	                                        userinfo.userName +
	                                        '" passengerId="" idcardCode="' +
	                                        userinfo.idcardCode +
	                                        '" idcardType="' +
	                                        userinfo.idcardType +
	                                        '" cardEndTime="' +
	                                        cardEndTime +
	                                        '" phone="' +
	                                        userinfo.userPhone +
	                                        '" flightPassengerName="' +
	                                        userinfo.flightPassengerName +
	                                        '">' +
	                                        userinfo.flightPassengerName +
	                                        '</li>'
	                                }

	                            }
	                        });
	                if (length == 0) { // 没有找到用户
	                } else if (length == 1) // 搜索到了信息
	                {
	                    userIsExist = 1;
	                    $("#userlist").html(html);
	                } else if (length > 1) { // 手机号注册了两个公司
	                    userIsExist = 1;
	                }
	            }
	        });
	    }
	    // /**
	    //  * 主界面是否已经存在选中的出行人-----------------------------------------------------------
	    //  */
	    // function hasPassenger(name, idcardType, idcardCode) {
	    // 	var has = false;
	    // 	// 主界面已经选中的出行人
	    // 	$("#userinfolist").find(".or_border")
	    // 			.each(
	    // 					function() {
	    // 						if ($(this).find("input[name='passengerName']")
	    // 								.val() == name
	    // 								&& $(this).find("input[name='idcardCode']")
	    // 										.val() == idcardCode
	    // 								&& $(this)
	    // 										.find("select[name='idcardType']")
	    // 										.val() == idcardType) {
	    // 							// 已经存在
	    // 							has = true;
	    // 						}
	    // 					});
	    // 	return has;
	    // }
	    /**
	     * 是否已经选中出行人
	     */
	    function isPassengerChecked(name, idcardCode, idcardType) {
	        var checked = false;
	        $("#userlist li").each(
	            function() {
	                if ($(this).attr("pname") == name &&
	                    $(this).attr("idcardCode") == idcardCode &&
	                    $(this).attr("idcardType") == idcardType) {
	                    checked = true;
	                    return checked;
	                }
	            });
	        return checked;
	    }

	    // 选择员工出行人
	    function bindPassengerCheckUserEvent() {
	        $("#checkuser input[type='checkbox']").each(function() {
	            $(this).click(function() {
	                bindPassengerCheckEvent($(this));
	            });
	        });
	    }

	    // 选择非员工出行人
	    function bindPassengerCheckNotUserEvent() {
	        $("#notuser_list input[type='checkbox']").each(function() {
	            $(this).click(function() {
	                bindPassengerCheckEvent($(this));
	            });
	        });
	    }

	    // 新增临客（2016.11.16）--------------------------------------------------------------------------------------
	    function addPassenger() {
	        var tel = $("#AddTicketLinDialog #telnums").val();
	        var card = $("#AddTicketLinDialog #cards").val();
	        var name = $("#AddTicketLinDialog #names").val();
	        var cardtype = $("#AddTicketLinDialog #cardsType option:checked").val();
	        var date = $("#AddTicketLinDialog #validDate").val();
	        var birthDays = $("#AddTicketLinDialog #birthday").val();
	        var gender = $("#AddTicketLinDialog input[name='radioGender']:checked")
	            .val();
	        if (name == "" || name == null) {
	            $("#AddTicketLinDialog #errname").text("*姓名不能为空");

	            return false;
	        } else {
	            $("#AddTicketLinDialog #errname").text("");
	        }

	        if (tel == "" || tel == null) {
	            $("#AddTicketLinDialog #errtel").text("*手机号不能为空");
	            return false;
	        } else if (!checkPhone1(tel)) {
	            $("#AddTicketLinDialog #errtel").text("*手机号输入不正确");
	            return false;
	        } else {
	            $("#AddTicketLinDialog #errtel").text("");
	        }
	        if (card == "" || card == null) {
	            $("#AddTicketLinDialog #errcard").text("*证件号码不能为空");
	            return false;
	        } else if (!isIdCardNo(card) && cardtype == 1) {
	            $("#AddTicketLinDialog #errcard").text("身份证号输入不正确");
	            return false;
	        } else if (cardtype == 2 && card == "") {
	            $("#AddTicketLinDialog #errcard").text("护照号输入不正确");
	            return false;
	        } else if (!$("#AddTicketLinDialog #divUseDate").hasClass("hidden") &&
	            date == "") {
	            $("#AddTicketLinDialog #errcard").text("");
	            $("#AddTicketLinDialog #errdate").text("证件有效期不能为空");
	            return false;
	        } else if (!$("#AddTicketLinDialog #divBirthday").hasClass("hidden") &&
	            birthDays == "") {
	            $("#AddTicketLinDialog #errBirthday").text("");
	            $("#AddTicketLinDialog #errBirthday").text("出生日期不能为空！");
	            return false;
	        }
	        if (!checkUsersName2(name)) {
	            $("#nextNameTip").modal("show");
	            return false;;
	        } else {
	            $("#AddTicketLinDialog span[id^='err']").text("")
	        }

	        var cardEndTime = "";
	        if ($("#AddTicketLinDialog #validDate").val() != null &&
	            $("#AddTicketLinDialog #validDate").val() != undefined &&
	            $("#AddTicketLinDialog #validDate").val() != "") {
	            cardEndTime = new Date(Date.parse($(
	                "#AddTicketLinDialog #validDate").val().replace(/-/g, "/")));
	        }
	        if (birthDays != "" && birthDays != null && birthDays != undefined) {
	            birthDays = new Date(Date.parse(birthDays.replace(/-/g, "/")));
	        }

	        var userhtml = "";
	        var param = {};
	        param.name = name;
	        param.idcardType = cardtype;
	        param.idcardCode = card;
	        param.phone = tel;
	        param.cardEndTime = cardEndTime;
	        param.birthday = birthDays;
	        param.sex = gender;
	        $.doAjax({
	            type: "post",
	            url: "/user/passenger",
	            data: JSON.stringify(param),
	            contentType: "application/json",
	            error: function(err) {
	                $("#addlinerr").text(err.message);
	                //console.log("添加临客失败：" + err.message);
	            },
	            success: function(id) {
	                // 加入已选择

	                var name = param.name;
	                var cardtype = param.idcardType;
	                var card = param.idcardCode;
	                var cardEndTime = "";
	                var flightPassengerName = param.name;
	                if (param.cardEndTime != "") {
	                    var cardEndTime = getSmpFormatDate(param.cardEndTime);
	                }
	                var phone = param.phone;
	                var isChecked = false;
	                var checkedClass = ''

	                //判断当前已选住客人数是否超过房间数
	                if ($("#userlist li").length < parseInt($('.passenger_max').text())) {
	                    isChecked = true;
	                }
	                if (isChecked) {
	                    checkedClass = 'checked disabled'
	                }

	                var html = '<li class="' + checkedClass + '" userId="' + id + '" pname="' + name +
	                    '" passengerId="' + id + '" idcardCode="' + card +
	                    '" idcardType="' + cardtype + '" cardEndTime="' +
	                    cardEndTime + '" phone="' + phone +
	                    '" flightPassengerName="' + flightPassengerName +
	                    '">' + flightPassengerName + '</li>';
	                var checHtml = '<li userid="' + id + '" pname="' + name + '" passengerid="' + id + '" idcardcode="' + card + '" idcardtype="' + cardtype + '" cardendtime="' + cardEndTime + '" phone="' + phone + '" flightpassengername="' + name + '">' + name + '</li>';

	                $("#checkuser ul.notUser").append(html).removeClass('hidden');
	                $("#checkuser ul.user").addClass('hidden');
	                if (isChecked) {
	                    $("#userlist").append(checHtml);
	                }
	                //常用出行人icon显示
	                $("#isUser").removeClass("fa-dot-circle-o").addClass(
	                    "fa-circle-o");
	                $("#notUser").removeClass("fa-circle-o").addClass(
	                    "fa-dot-circle-o");
	                $(".not_staff_add").removeClass("hidden");
	                $(".add_traveler_list").addClass("hidden");
	                // 非员工
	                $("#searchUserType").val("2");

	                $('#AddTicketLinDialog').modal("hide");
	                bindSelectPassengerDelEvent();

	                //searchNotUser();
	            }
	        })
	    }

	    /**
	     * 注册取消选择事件
	     */
	    function bindSelectPassengerDelEvent() {
	        var size = $("#userlist").find("li").length;
	        $("#userlist").find("li").each(function(index) {
	            if (index == size - 1) {
	                $(this).children("i").click(function() {
	                    var numitem = $("#userlist").find("li").length;
	                    if (numitem == 1) {
	                        $("#divselect").css("display", "none");
	                    }

	                    // 取消下面的选中框
	                    var userId = $(this).parent().attr("userId");
	                    var name = $(this).parent().attr("pname");
	                    var passengerId = $(this).parent().attr("passengerId");
	                    var idcardCode = $(this).parent().attr("idcardCode");
	                    var idcardType = $(this).parent().attr("idcardType");

	                    var element = "";
	                    if (userId != null & userId != "") {
	                        // 员工
	                        element = "#checkuser input[type='checkbox']";
	                    } else {
	                        // 非员工
	                        element = "#notuser_list input[type='checkbox']";
	                    }
	                    $(element).each(function() {
	                        if (isPassengerChecked(name, idcardCode, idcardType)) {
	                            $(this)[0].checked = false;
	                        }
	                    });

	                    // 删除上面的选中标签
	                    $(this).parent().remove();
	                });
	            }
	        });
	    }
	    // 添加员工(2016.11.15)--------------------------------------------------------------
	    $("#btnsaveUser")
	        .click(
	            function() {
	                userIsExist = 0
	                var tel = $("#AddTicketEmyDialog #telnums").val();
	                var card = $("#AddTicketEmyDialog #cards").val();
	                var name = $("#AddTicketEmyDialog #names").val();
	                var cardtype = $(
	                        "#AddTicketEmyDialog #cardsType option:checked")
	                    .val();
	                var date = $("#AddTicketEmyDialog #validDate").val();
	                var birthDay = $("#AddTicketEmyDialog #birthday").val();
	                var gender = $(
	                        "#AddTicketEmyDialog input[name='radioGender']:checked")
	                    .val();
	                var corpId = userInfo.corpId;
	                if (name == "" || name == null) {
	                    $("#AddTicketEmyDialog #errname").text("*姓名不能为空");

	                    return false;
	                } else {
	                    $("#AddTicketEmyDialog #errname").text("");
	                }

	                if (tel == "" || tel == null) {
	                    $("#AddTicketEmyDialog #errtel").text("*手机号不能为空");
	                    return false;
	                } else if (!checkPhone1(tel)) {
	                    $("#AddTicketEmyDialog #errtel").text("*手机号输入不正确");
	                    return false;
	                } else {
	                    $("#AddTicketEmyDialog #errtel").text("");
	                }
	                if (card == "" || card == null) {
	                    $("#AddTicketEmyDialog #errcard").html("*证件号码不能为空");
	                    return false;
	                } else if (!isIdCardNo(card) && cardtype == 1) {
	                    $("#AddTicketEmyDialog #errcard").html("身份证号输入不正确");
	                    return false;
	                } else if (cardtype == 2 && card == "") {
	                    $("#AddTicketEmyDialog #errcard").text("护照号输入不正确");
	                    return false;
	                } else if (!$("#AddTicketEmyDialog #divUseDate")
	                    .hasClass("hidden") &&
	                    date == "") {
	                    $("#AddTicketEmyDialog #errcard").text("");
	                    $("#AddTicketEmyDialog #errdate").text("证件有效期不能为空");
	                    return false;
	                } else if (!$("#AddTicketEmyDialog #divBirthday")
	                    .hasClass("hidden") &&
	                    birthDay == "") {
	                    $("#AddTicketEmyDialog #errBirthday").text("");
	                    $("#AddTicketEmyDialog #errBirthday").text(
	                        "出生日期不能为空！");
	                    return false;
	                }
	                if (!checkUsersName2(name)) {
	                    $("#nextNameTip").modal("show");
	                    return false;;
	                } else {
	                    $("#AddTicketEmyDialog span[id^='err']").text("");
	                    var cardEndTime = $(
	                        "#AddTicketEmyDialog #validDate").val();
	                    if (cardEndTime != null && cardEndTime != undefined &&
	                        cardEndTime != "") {
	                        cardEndTime = new Date(Date.parse(cardEndTime
	                            .replace(/-/g, "/")));
	                    } else {
	                        cardEndTime = "";
	                    }

	                    if (birthDay != "" || birthDay != null ||
	                        birthDay != undefined) {
	                        birthDay = new Date(Date.parse(birthDay
	                            .replace(/-/g, "/")));
	                    }

	                    var param = {};
	                    param.userName = name;
	                    param.userPhone = tel;
	                    param.idcardType = cardtype;
	                    param.idcardCode = card;
	                    param.cardEndTime = cardEndTime;
	                    param.policyId = -1;
	                    param.departmentId = -1;
	                    param.costCenterId = -1;
	                    param.corpId = corpId;
	                    param.isIndividual = 0;
	                    param.birthday = birthDay;
	                    param.sex = gender;
	                    $
	                        .doAjax({
	                            type: "post",
	                            url: "/tmc/corpemp/info/other",
	                            data: JSON.stringify(param),
	                            contentType: "application/json",
	                            error: function(err) {
	                                $("#addusererr").text(err.message);
	                                //    		console.log("添加员工报错"+err.message);

	                            },
	                            success: function(data) {
	                                var jsondata = eval(data);
	                                var html = "";
	                                var check = true;
	                                var name = param.userName;
	                                var cardtype = param.idcardType;
	                                var card = param.idcardCode;
	                                var cardEndTime = "";
	                                var flightPassengerName = param.userName == null ? "" :
	                                    param.userName;
	                                if (param.cardEndTime != "") {
	                                    cardEndTime = getSmpFormatDate(param.cardEndTime);
	                                }
	                                var phone = param.userPhone;
	                                //			//判断主界面是否存在
	                                //			if(hasPassenger(name,cardtype,card))
	                                //			{
	                                //				check=false;
	                                //			}
	                                //			else
	                                //			{	//找到是否选中
	                                //				if(isPassengerChecked(name,card,cardtype))
	                                //				{
	                                //					check=false;
	                                //				}
	                                //			}
	                                if (check) {
	                                    html = '<li userId="' +
	                                        data +
	                                        '" pname="' +
	                                        name +
	                                        '" passengerId="" idcardCode="' +
	                                        card +
	                                        '" idcardType="' +
	                                        cardtype +
	                                        '" cardEndTime="' +
	                                        cardEndTime +
	                                        '" phone="' +
	                                        phone +
	                                        '" flightPassengerName="' +
	                                        flightPassengerName +
	                                        '">' +
	                                        flightPassengerName +
	                                        '</li>';
	                                }
	                                $('#AddTicketEmyDialog').modal(
	                                    "hide");
	                                searchUser1();
	                                $("#userlist").html(html);

	                            }
	                        })

	                }
	            });

	    getPayType();
	    //获取企业支付方式和剩余额度
	    function getPayType() {
	        $.doAjax({

	            url: "/search/corp/params",
	            type: 'get',
	            success: function(data) {
	                //			var payType = data.payType;
	                $(".payWay").attr("data-hotelPayType", data.hotelPayType);
	                $("#dueBtn").attr("data-hotelPayType", data.hotelPayType);
	                if (data.hotelPayType == 1) {

	                    $(".payWay").html("个人支付");
	                    if (data.isOpenAudit == "1") { /* 因公审批 */
	                        isOpenAudit = data.isOpenAudit;
	                        $(".m_bottom").html('订单一经提交，即<span class="payWay">确认审批</span>，如果后<br/>续审核通过均会自动下单并产生相应<br/>的费用，你确定提交审批吗？');
	                        $(".m_bottom_p").hide();
	                        /* 显示审批 */
	                        getAuditing()
	                    }

	                } else if (data.hotelPayType == 2) {
	                    if (data.isOpenAudit == "1") { /* 因公审批 */
	                        isOpenAudit = data.isOpenAudit;
	                        $(".m_bottom").html('订单一经提交，即<span class="payWay">确认审批</span>，如果后<br/>续审核通过均会自动下单并产生相应<br/>的费用，你确定提交审批吗？');
	                        $(".m_bottom_p").hide();
	                        /* 显示审批 */
	                        getAuditing()
	                    } else {
	                        $(".payWay").html("企业垫付");
	                        $(".surplusMoney").html("不限制"); //data.availableLimit+"元"
	                        $(".surplusMoney").parent("p").removeClass("hidden")
	                    }

	                }

	            }

	        })

	    }

	    /**
	     * 违规校验
	     */
	    function checkPolicyOver() {

	        //需要违规校验的员工ID
	        var userIds = "";
	        var userInfo = {};
	        var userFlight = {};
	        var overData = {}; //接口参数
	        overData.policyOverParams = [];
	        var hotelInfoData = {};
	        $("input[name='customerNames']", "#customers").each(function(index) {

	            var passengerUserId = $(this).attr("userId");
	            var passengerName = $(this).val();
	            //var flightPassengerName = $(this).find("input[name='flightPassengerName']").val();
	            userInfo[passengerUserId] = passengerName;
	            //userFlight[passengerUserId]=flightPassengerName;
	            hotelInfoData.anotherPassengerUserId = passengerUserId;
	            hotelInfoData.minRoomPrice = roomPrice;
	            overData.policyOverParams.push(hotelInfoData);
	            hotelInfoData = {};

	        });

	        $.doAjax({
	            url: '/passenger/policy/check/hotel',
	            type: 'post',
	            data: JSON.stringify(overData),
	            error: function(err) {
	                //					   	console.log(err.message);
	            },
	            success: function(data) {

	                var overInfoHtml = "";
	                var wayToOver = false;

	                for (var i = 0; i < data.length; i++) {

	                    var userId = data[i].passengerUserId;
	                    var flightPassengerName = userInfo[userId];
	                    var policyOverData = data[i].overData;

	                    if (policyOverData.length > 0) {
	                        overInfoHtml += "<li id='policyOver_" + userId + "' class='' userId='" + userId + "' flightPassengerName=" + flightPassengerName + "'>" + flightPassengerName + "<span class='err_detail'>（违规详情）</span>";
	                        overInfoHtml += "<div id='policyOverInfo_" + userId + "' class='err_detail_content hidden'>";

	                        for (var index in policyOverData) {
	                            var policyId = policyOverData[index].policyId;
	                            var itemId = policyOverData[index].itemId;
	                            var overContent = policyOverData[index].overContent;
	                            var factInfo = policyOverData[index].factInfo;
	                            overInfoHtml += "<p class='go_way' itemId='" + itemId + "' policyId='" + policyId + "'>" +
	                                "<span>" + overContent + "</span>，<span>" + factInfo + "</span>" +
	                                "</p>";
	                        }
	                        overInfoHtml += "</div></li>";
	                        //有违规
	                        wayToOver = true;
	                    }
	                }

	                if (overInfoHtml == "") {
	                    //没有违规
	                    $(".rule_ect").addClass("hidden");
	                } else {
	                    $(".rule_ect").removeClass("hidden");
	                    //构建违规内容界面
	                    $(".rule_ect .traveler_list").html(overInfoHtml);

	                    if (wayToOver) {
	                        $(".ect_situation .way_to").removeClass("hidden");
	                    } else {
	                        $(".ect_situation .way_to").addClass("hidden");
	                    }

	                    // if(wayBackOver){
	                    // 	$(".ect_situation .way_back").removeClass("hidden");
	                    // }else{
	                    // 	$(".ect_situation .way_back").addClass("hidden");
	                    // }

	                    //注册违规详情内容显示事件
	                    $(".err_detail").mouseover(function() {
	                        // $(".err_detail_content").removeClass('hidden');
	                        $(this).next().removeClass('hidden');
	                    }).mouseout(function() {
	                        // $(".err_detail_content").addClass('hidden');
	                        $(this).next().addClass('hidden');
	                    })
	                }
	            }
	        });
	    }
	    //政策校验
	    checkPolicyOver();
	});

	/**
	 * 校验身份证号码
	 */
	function checkIdCard() {
	    var err = "";
	    $("#userinfolist").find(".or_border").each(function(index) {
	        var idcardType = $(this).find("select[name='idcardType']").val();
	        var idcardCode = $(this).find("input[name='idcardCode']").val();
	        if (idcardType == 1) {
	            //身份证
	            if (!isIdCardNo(idcardCode)) {
	                err += "," + (index + 1);
	            }
	        }
	    });
	    if (err != "") {
	        dialogHTML("第" + (err.substr(1)) + "位乘机人的身份证号码不正确！");
	        return false;
	    }
	    return true;
	}

	//验证手机号
	function checkPhone1(obj) {
	    if (!(/^1[2|3|4|5|6|7|8|9]\d{9}$/.test(obj))) {
	        return false;
	    }
	    return true;

	}
	/**
	 * 校验身份证号码
	 */
	function checkPhone() {
	    if (!isphone($("#linkTel").val())) {
	        $("#linkTelErr").removeClass("hidden");
	        return false;
	    }
	    $("#linkTelErr").addClass("hidden");
	    return true;
	}

	function checkcode(obj) {
	    var type = $("#type" + obj).val();
	    if (type == 1) {
	        var value = $("#" + obj).val();
	        if (!isIdCardNo(value)) {
	            $("#err" + obj).removeClass("hidden");
	        } else {
	            $("#err" + obj).addClass("hidden");
	        }
	    } else {
	        $("#err" + obj).addClass("hidden");
	    }
	}

	function cardTypeChange(selectId, cardEndTimeId) {
	    if ($("#" + selectId).val() == 2) {
	        $("#" + cardEndTimeId).removeClass("hide");
	    } else {
	        $("#" + cardEndTimeId).addClass("hide");
	        $("#" + cardEndTimeId).val("");
	    }
	}

	function checkchange(id, pid) {
	    var ids = $(pid + " #" + id).val();
	    if (ids == 2) {

	        $(pid + " #divUseDate").removeClass("hidden");
	        $(pid + " #divBirthday").removeClass("hidden");
	        $(pid + " #divGender").removeClass("hidden");
	    } else if (ids == 3 || ids == 4) {
	        $(pid + " #divUseDate").addClass("hidden");
	        $(pid + " #divBirthday").removeClass("hidden");
	        $(pid + " #divGender").removeClass("hidden");
	    } else {
	        $(pid + " #divUseDate").addClass("hidden");
	        $(pid + " #divBirthday").addClass("hidden");
	        $(pid + " #divGender").addClass("hidden");
	    }
	}

	//清空form表单
	function resertform(id) {
	    $(id + ' .form-horizontal')[0].reset();
	    if (id == "#AddTicketLinDialog") {
	        $("#addlinerr").text("");
	    } else if (id == "#AddTicketEmyDialog") {
	        $("#addusererr").text("");
	    }

	    $(id + " #divUseDate").addClass("hidden");
	    $(id + " #divBirthday").addClass("hidden");
	    $(id + " #divGender").addClass("hidden");
	    $(id + " #cardsType").val(1);

	}



	function accAdd(arg1, arg2) {
	    var r1, r2, m, c;
	    try {
	        r1 = arg1.toString().split(".")[1].length;
	    } catch (e) {
	        r1 = 0;
	    }
	    try {
	        r2 = arg2.toString().split(".")[1].length;
	    } catch (e) {
	        r2 = 0;
	    }
	    c = Math.abs(r1 - r2);
	    m = Math.pow(10, Math.max(r1, r2));
	    if (c > 0) {
	        var cm = Math.pow(10, c);
	        if (r1 > r2) {
	            arg1 = Number(arg1.toString().replace(".", ""));
	            arg2 = Number(arg2.toString().replace(".", "")) * cm;
	        } else {
	            arg1 = Number(arg1.toString().replace(".", "")) * cm;
	            arg2 = Number(arg2.toString().replace(".", ""));
	        }
	    } else {
	        arg1 = Number(arg1.toString().replace(".", ""));
	        arg2 = Number(arg2.toString().replace(".", ""));
	    }
	    return (arg1 + arg2) / m;
	}

	function imgError(image) {
	    $(image).attr("src", "../../../images/hotel/big3.png");
	}

	function accMul(arg1, arg2) {
	    var m = 0,
	        s1 = arg1.toString(),
	        s2 = arg2.toString();
	    try { m += s1.split(".")[1].length } catch (e) {}
	    try { m += s2.split(".")[1].length } catch (e) {}
	    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
	}

	function initServiceFee(userInfo) {
	    $.doAjax({
	        url: '/tmc/servicefee/corp/price/' + userInfo.corpId + '/301',
	        type: 'get',
	        async: false,
	        success: function(data) {
	            serviceFee = data.serviceFee;
	        }
	    });
	}

	//得到违规原因
	function getpolicyreason() {
	    $.ajax({
	        type: "get",
	        url: "/passenger/policy/reason/hotel", //corpId
	        data: null,
	        async: false,
	        success: function(data) {
	            var jsondata = eval(data);
	            var html = "";
	            $.each(jsondata, function(i, info) {
	                html += "<option value='" + info.reasonId + "'>" + info.reasonInfo + "</option>";
	            });
	            $("#toreason").append(html);
	        }
	    })
	}

	// 价格取整进位
	function priceCarry(price) {
	    return parseInt(price) + 1
	}