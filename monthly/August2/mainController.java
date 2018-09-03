package com.flybycloud.trip.tmc.manage.controller;

import com.mangofactory.swagger.annotations.ApiIgnore;
import com.wordnik.swagger.annotations.Api;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 主界面
 * @author chenlei
 *
 */
@Controller
@Api(value = "/main", description = "主页跳转控制器", produces = MediaType.APPLICATION_JSON_VALUE)
@ApiIgnore
public class MainController extends BaseController {

    
    @RequestMapping(value = "/main")
    public String main() {
        return "/main";
    }
    
    
    @RequestMapping(value = "/socktpage")
    public String socketpage() {
        return "/socktpage";
    }
    
    /******************************************************************************/
    
    @RequestMapping(value = "/flight/ticketList")
    public String ticketList() {
        return "/flight/ticketList";
    }


    @RequestMapping(value = "/flight/ticketChangeList")
    public String ticketChangeList() {
        return "/flight/ticketChangeList";
    }

    @RequestMapping(value = "/flight/ticketListOne")
    public String ticketListOne() {
        return "/flight/ticketListOne";
    }
    
    @RequestMapping(value = "/flight/ticketOrderFinish")
    public String ticketOrderFinish() {
        return "/flight/ticketOrderFinish";
    }

    @RequestMapping(value = "/flight/intlOrderSuccess")
    public String intlOrderSuccess() {
        return "/flight/intlOrderSuccess";
    }

    @RequestMapping(value = "/flight/ticketOrderSubmit")
    public String ticketOrderSubmit() {
        return "/flight/ticketOrderSubmit";
    }

    @RequestMapping(value = "/flight/pnrOrderSubmit")
    public String pnrOrderSubmit() {
        return "/flight/pnrOrderSubmit";
    }
    
    @RequestMapping(value = "/flight/internationalTicketSubmit")
    public String internationalTicketSubmit() {
        return "/flight/internationalTicketSubmit";
    }
    
    @RequestMapping(value = "/flight/ticketSearch")
    public String ticketSearch() {
        return "/flight/ticketSearch";
    }
    
    @RequestMapping(value = "/flight/ticketParity")
    public String ticketparity() {
        return "/flight/ticketParity";
    }
    @RequestMapping(value = "/flight/zhengcaiList")
    public String ticketzhengcaiList() {
        return "/flight/zhengcaiList";
    }
    @RequestMapping(value = "/flight/internationalList")
    public String ticketInternationalList() {
        return "/flight/internationalList";
    }
    /******************************************************************************/
    
    @RequestMapping(value = "/corp/addStep1")
    public String addStep1() {
        return "/corp/addStep1";
    }
    
    @RequestMapping(value = "/corp/addStep2")
    public String addStep2() {
        return "/corp/addStep2";
    }
    
    @RequestMapping(value = "/corp/addStep3")
    public String addStep3() {
        return "/corp/addStep3";
    }
    
    @RequestMapping(value = "/corp/addStep4")
    public String addStep4() {
        return "/corp/addStep4";
    }
    
    @RequestMapping(value = "/corp/addStep5")
    public String addStep5() {
        return "/corp/addStep5";
    }
    
    @RequestMapping(value = "/corp/addStep6")
    public String addStep6() {
        return "/corp/addStep6";
    }
    
    @RequestMapping(value = "/corp/addStep7")
    public String addStep7() {
        return "/corp/addStep7";
    }
    
    @RequestMapping(value = "/corp/addStep8")
    public String addStep8() {
        return "/corp/addStep8";
    }
    
    @RequestMapping(value = "/corp/123")
    public String add123() {
        return "/corp/123";
    }
    
    @RequestMapping(value = "/corp/corpCostCenter")
    public String corpCostCenter() {
        return "/corp/corpCostCenter";
    }
    
    @RequestMapping(value = "/corp/corpDepartment")
    public String corpDepartment() {
        return "/corp/corpDepartment";
    }
    
    @RequestMapping(value = "/corp/corpDetail")
    public String corpDetail() {
        return "/corp/corpDetail";
    }
    
    @RequestMapping(value = "/corp/corpList")
    public String corpList() {
        return "/corp/corpList";
    }
    
    @RequestMapping(value = "/corp/corpPrice")
    public String corpPrice() {
        return "/corp/corpPrice";
    }
    
    @RequestMapping(value = "/corp/corpTripPolicy")
    public String corpTripPolicy() {
        return "/corp/corpTripPolicy";
    }
    
    @RequestMapping(value = "/corp/corpTripPolicyReason")
    public String corpTripPolicyReason() {
        return "/corp/corpTripPolicyReason";
    }
    
    @RequestMapping(value = "/corp/corpUserList")
    public String corpUserList() {
        return "/corp/corpUserList";
    }
    
    @RequestMapping(value = "corp/corpActivity")
    public String corpActivity() {
        return "corp/corpActivity";
    }

    @RequestMapping(value = "/corp/userList")
    public String userList() {
        return "/corp/userList";
    }
    
    @RequestMapping(value = "/corp/corpPriceDetail")
    public String corpPriceDetail() {
        return "/corp/corpPriceDetail";
    }
    @RequestMapping(value = "/corp/corpParams")
    public String corpParams() {
        return "/corp/corpParams";
    }
    @RequestMapping(value = "/corp/corpUserTravel",method = RequestMethod.GET)
    public String userRouteList() {
        return "/corp/corpUserTravel";
    }

    @RequestMapping(value = "/corp/fitRegister")
    public String fitRegister() {
        return "/corp/fitRegister";
    }

    /******************************************************************************/

    @RequestMapping(value = "/finance/corpFinanceDaily")
    public String corpFinanceDaily() {
        return "/finance/corpFinanceDaily";
    }
    
    @RequestMapping(value = "/finance/corpPayLimit")
    public String corpPayLimit() {
        return "/finance/corpPayLimit";
    }
    
    @RequestMapping(value = "/finance/corpSettlement")
    public String corpSettlement() {
        return "/finance/corpSettlement";
    }
    
    @RequestMapping(value = "/finance/corpSettlementCollect")
    public String corpSettlementCollect() {
        return "/finance/corpSettlementCollect";
    }
    
    @RequestMapping(value = "/finance/tmcFlightTicketDaily")
    public String tmcFlightTicketDaily() {
        return "/finance/tmcFlightTicketDaily";
    }
    
    @RequestMapping(value = "/finance/tmcSalesReportDaily")
    public String tmcSalesReportDaily() {
        return "/finance/tmcSaleDaily";
    }
    
    @RequestMapping(value = "/finance/insuranceDetail")
    public String InsuranceDetails() {
        return "/finance/insuranceDetail";
    }

    @RequestMapping(value = "/finance/intl/corpSettlement")
    public String tmcIntlCorpSettlement(){
        return "/finance/intlCorpSettlement";
    }

    /******************************************************************************/
    
    @RequestMapping(value = "/order/flightOrder")
    public String flightOrder() {
        return "/order/flightOrder";
    }
    
    @RequestMapping(value = "/order/flightOrderDetail")
    public String flightOrderDetail() {
        return "/order/flightOrderDetail";
    }
    
    @RequestMapping(value = "/order/flightRefund")
    public String flightRefund() {
        return "/order/flightRefund";
    }

    @RequestMapping(value = "/order/flightChange")
    public String flightChange() {
        return "/order/flightChange";
    }

    
    @RequestMapping(value = "/order/flightRefundChangeDetail")
    public String flightRefundChangeDetail() {
        return "/order/flightRefundChangeDetail";
    }
    
    @RequestMapping(value = "/order/orderDetail")
    public String orderDetail() {
        return "/order/orderDetail";
    }
    
    @RequestMapping(value = "/order/internationalOrderDetail")
    public String internationalOrderDetail() {
        return "/order/internationalOrderDetail";
    }
    
    @RequestMapping(value = "/order/orderRefundDetail")
    public String orderRefundDetail() {
        return "/order/orderRefundDetail";
    }
    @RequestMapping(value = "/order/orderChangeDetail")
    public String orderChangeDetail() {
        return "/order/orderChangeDetail";
    }
    @RequestMapping(value = "/order/orderB2BChangeDetail")
    public String orderB2BChangeDetail() {
        return "/order/orderB2BChangeDetail";
    }
    @RequestMapping(value = "/flight/dangerousTips")
    public String dangeraousTips() {
        return "/flight/dangerousTips";
    }
    @RequestMapping(value = "/order/orderTicketParity")
    public String orderTicketparity() {
        return "/order/orderTicketParity";
    } 
    @RequestMapping(value = "/order/flightIntlApplyDetail")
    public String flightIntlApplyDetail() {
        return "/order/flightIntlApplyDetail";
    }
    
    @RequestMapping(value = "/order/ticketItinerary")
    public String ticketItinerary() {
        return "/order/ticketItinerary";
    }
    @RequestMapping(value = "/order/charterForm")
    public String charterForm() {
        return "/order/charterForm";
    }
    @RequestMapping(value = "/order/charterFormDetail")
    public String charterFormDetail() {
        return "/order/charterFormDetail";
    }
    /**
     * open票检测
     * @return
     */
    @RequestMapping(value="/order/open/check")
    public String openCheck(){
    	return "order/openCheck";
    }
    
    @RequestMapping(value="/order/checkResult")
    public String openCheckResult(){
    	return "/order/checkResult";
    }
    
    /**
     * PNR导入
     * @return
     */
    @RequestMapping(value="/order/pnrImport")
    public String pnrImport(){
    	return "/order/orderPnrImport";
    }

    /**
     * 外部机票导入
     * @return
     */
    @RequestMapping(value="/order/outsidePnrImport")
    public String outsidePnrImport(){
        return "/order/outsidePnrImport";
    }

    /**
     * Q信箱
     * @return
     */
    @RequestMapping(value="/order/flight/qt")
    public String orderFlightQt(){
        return "/order/flightQt";
    }

    @RequestMapping(value = "/order/flightOrderSync")
    public String flightOrderSync() {
        return "/order/flightOrderSync";
    }

    @RequestMapping(value = "/order/flightOrderSyncDetail")
    public String flightOrderSyncDetail() {
        return "/order/flightOrderSyncDetail";
    }

    /******************************************************************************/
    
    @RequestMapping(value = "/system/airline")
    public String airline() {
        return "/system/airline";
    }
    
    @RequestMapping(value = "/system/airlinePolicy")
    public String airlinePolicy() {
        return "/system/airlinePolicy";
    }
    
    @RequestMapping(value = "/system/airlineSeatClass")
    public String airlineSeatClass() {
        return "/system/airlineSeatClass";
    }
    
    @RequestMapping(value = "/system/operateLog")
    public String operateLog() {
        return "/system/operateLog";
    }
    
    @RequestMapping(value = "/system/sms")
    public String sms() {
        return "/system/sms";
    }

    @RequestMapping(value = "/system/message")
    public String shortMessage() {
        return "/system/message";
    }

    @RequestMapping(value = "/system/alipayContract")
    public String alipayContract() {
        return "/system/alipayContract";
    }
    
    /******************************************************************************/
    
    @RequestMapping(value = "/tmc/tmcInfo")
    public String tmcInfo() {
        return "/tmc/tmcInfo";
    }
    
    @RequestMapping(value = "/tmc/tmcInsurance")
    public String tmcInsurance() {
        return "/tmc/tmcInsurance";
    }
    
    @RequestMapping(value = "/tmc/tmcRole")
    public String tmcRole() {
        return "/tmc/tmcRole";
    }
    
    @RequestMapping(value = "/tmc/tmcRoleRight")
    public String tmcRoleRight() {
        return "/tmc/tmcRoleRight";
    }
    
    @RequestMapping(value = "/tmc/tmcServiceFee")
    public String tmcServiceFee() {
        return "/tmc/tmcServiceFee";
    }
    
    @RequestMapping(value = "/tmc/tmcUser")
    public String tmcUser() {
        return "/tmc/tmcUser";
    }
    
    @RequestMapping(value = "/tmc/tmcParams")
    public String tmcParams() {
        return "/tmc/tmcParams";
    }
    
    @RequestMapping(value = "/tmc/tmcEterm")
    public String tmcEterm() {
        return "/tmc/tmcEterm";
    }
    
    @RequestMapping(value = "/tmc/pricePlatformConfig")
    public String pricePlatformConfig() {
        return "/tmc/pricePlatformConfig";
    }
    
    @RequestMapping(value = "/tmc/tmcParamsTicket")
    public String tmcParamsTicket() {
        return "/tmc/tmcParamsTicket";
    }
    
    @RequestMapping(value = "/tmc/logo")
    public String tmcLogo() {
        return "/tmc/tmcLogo";
    }
    @RequestMapping(value = "/tmc/gathering")
    public String tmcGathering() {
        return "/tmc/tmcGathering";
    }
    @RequestMapping(value = "/tmc/customer")
    public String tmcCustomer() {
        return "/tmc/tmcCustomer";
    }

    @RequestMapping(value = "/tmc/channel")
    public String tmcChannel() {
        return "/tmc/tmcChannel";
    }

    @RequestMapping(value = "/tmc/b2bSetUp")
    public String tmcB2BSetUp() {
        return "/tmc/tmcB2BSetUp";
    }
    /******************************************************************************/
    
    @RequestMapping(value = "/user/userInfo")
    public String userInfo() {
        return "/user/userInfo";
    }
    
    @RequestMapping(value = "/user/message")
    public String message() {
        return "/user/message";
    }
    
    @RequestMapping(value = "/user/resetPass")
    public String resetPass() {
        return "/user/resetPass";
    }
    
    @RequestMapping(value = "/user/forgotPwd")
    public String forgotPwd(){
    	 return "/user/forgotPwd";
    }
    
    @RequestMapping(value = "/point/error")
    public String uploadError(){
    	return "/points/uploadError";
    }
    
    @RequestMapping(value = "/point/success")
    public String uploadSuccess(){
    	return "/points/uploadSuccess";
    }
    
    @RequestMapping(value = "/point/download")
    public String downloadError(){
    	return "/points/downloadError";
    }
    
    @RequestMapping(value="/system/orderTicketErrRecord")
    public String orderTicketErr(){
    	return "/system/orderTicketErrRecord";
    }
    
//    @RequestMapping(value="/mapTest")
//    public String mapTest(){
//    	return "/mapTest";
//    }
    @RequestMapping(value="/car/carDetail")
    public String carDetail(){
    	return "/car/carDetail";
    }
    
    @RequestMapping(value="/car/carList")
    public String carList(){
    	return "/car/carList";
    }
    
    @RequestMapping(value="/car/carOrderSubmit")
    public String carOrderSubmit(){
    	return "/car/carOrderSubmit";
    }
    
    @RequestMapping(value="/car/carSearch")
    public String carSearch(){
    	return "/car/carSearch";
    }
    
    @RequestMapping(value="/car/bookingSuccess")
    public String bookingSuccess(){
    	return "/car/bookingSuccess";
    }
    
    @RequestMapping(value="/order/carOrder")
    public String carOrder(){
    	return "/order/carOrder";
    }
    
    @RequestMapping(value="/order/carOrderDetail")
    public String carOrderDetail(){
    	return "/order/carOrderDetail";
    }
    
    @RequestMapping(value="/order/hotelOrder")
    public String hotelOrder(){
    	return "/order/hotelOrder";
    }
    
    @RequestMapping(value="/hotel/search")
    public String hotelSearch(){
    	return "/hotel/hotelSearch";
    }
    
    @RequestMapping(value="/hotel/hotelList")
    public String hotelList(){
    	return "/hotel/hotelList";
    }
    @RequestMapping(value="/hotel/hotelSearchDetail")
    public String hotelSearchDetail(){
    	return "/hotel/hotelSearchDetail";
    }
    @RequestMapping(value="/hotel/hotelOrderSubmit")
    public String hotelOrderSubmit(){
    	return "/hotel/hotelOrderSubmit";
    }
    @RequestMapping(value="/order/hotelOrderDetail")
    public String hotelOrderDetail(){
    	return "/order/hotelOrderDetail";
    }
    @RequestMapping(value="/hotel/hotelBookingSuccess")
    public String hotelBookingSuccess(){
    	return "/hotel/hotelBookingSuccess";
    }
    @RequestMapping(value="/order/hotelImport")
    public String hotelImport(){
        return "/order/hotelImport";
    }
    
    /***********************************************/
    @RequestMapping(value = "/train/list")
    public String trainList() {
        return "/train/list";
    }
    @RequestMapping(value = "/train/index")
    public String trainIndex() {
        return "/train/index";
    }
   
    @RequestMapping(value = "/train/orderChangeList")
    public String orderChangeList() {
        return "/train/orderChangeList";
    }    
    @RequestMapping(value = "/train/submitTrainOrder")
    public String trainSubmit() {
        return "/train/submitTrainOrder";
    }
    @RequestMapping(value = "/order/trainOrder")
    public String orderTrain() {
        return "/order/trainOrder";
    }
    @RequestMapping(value = "/order/trainOrderDetail")
    public String orderTrainDetails() {
        return "/order/trainOrderDetail";
    }
    @RequestMapping(value = "/train/ticketOrderFinish")
    public String trainticketOrderFinish() {
        return "/train/ticketOrderFinish";
    }
   
    @RequestMapping(value = "/train/purchaseAgreement")
    public String trainpurchaseAgreement() {
        return "/train/purchaseAgreement";
    }
    
    @RequestMapping(value = "/train/orderChangeFinish")
    public String trainorderChangeFinish() {
        return "/train/orderChangeFinish";
    }
    @RequestMapping(value = "/train/trainChangeDetail")
    public String trainChangeDetail() {
        return "/train/trainChangeDetail";
    }

    /***********************************************/
    
    
    @RequestMapping(value = "/websocket")
    public String websocket() {
        return "/websocket";
    }

    /***********************************************/
    @RequestMapping(value = "/finance/trainSettlement")
    public String trainReconciliation() {
        return "/finance/trainSettlement";
    }

    @RequestMapping(value = "/finance/carSettlement")
    public String cartReconciliation() {
        return "/finance/carSettlement";
    }


    @RequestMapping(value = "/finance/detailSettlement")
    public String detailReconciliation() {
        return "finance/detailSettlement";
    }
    
    @RequestMapping(value = "/finance/countReport", method = RequestMethod.GET)
    public String countSettlement(){
    	return "finance/countReport";
    }
    
    @RequestMapping(value = "/finance/saleReport", method = RequestMethod.GET)
    public String saleSettlement(){
    	return "finance/saleReport";
    }
    
    @RequestMapping(value = "/finance/rechargeRecord", method = RequestMethod.GET)
    public String rechargeSettlement(){
    	return "finance/rechargeRecord";
    }
    
    /**************国际机票******************************/
    @RequestMapping(value = "/order/flightIntlApply", method = RequestMethod.GET)
    public String orderFlightIntlApply(){
    	return "/order/flightIntlApply";
    }
    
    /**
     * tmc消息模板
     * @author tiancongcong
     * 
     * @return
     */
    @RequestMapping(value = "/system/messageTemplate", method = RequestMethod.GET)
    public String tmcMessageTemplate(){
    	return "/system/messageTemplate";
    }
    
    @RequestMapping(value = "/system/addCorp", method = RequestMethod.GET)
    public String addCorp(){
    	return "/system/addCorp";
    }
    
    @RequestMapping(value = "/finance/ticketPrint", method = RequestMethod.GET)
    public String ticketPrint(){
    	return "finance/ticketPrint";
    }
    
    @RequestMapping(value = "/corp/corpInvoice", method = RequestMethod.GET)
    public String corpInvoice(){
    	return "/corp/corpInvoice";
    }

    @RequestMapping(value = "/corp/corpApproval", method = RequestMethod.GET)
    public String corpApproval(){
        return "/corp/corpApproval";
    }
    
    @RequestMapping(value = "/corp/addStep9", method = RequestMethod.GET)
    public String addStep9(){
    	return "/corp/addStep9";
    }

    @RequestMapping(value = "/corp/invoice", method = RequestMethod.GET)
    public String invoice(){
    	return "/corp/invoice";
    }
    
    @RequestMapping(value = "/order/flightDynamic", method = RequestMethod.GET)
    public String flightDynamic(){
    	return "/order/flightDynamic";
    }
    
    @RequestMapping(value = "/finance/corpPayRecord", method = RequestMethod.GET)
    public String corpPayRecord(){
    	return "/finance/corpPayRecord";
    }

    @RequestMapping(value = "/finance/hotelSettlement")
    public String hotelReconciliation() {
        return "/finance/hotelSettlement";
    }
    
    @RequestMapping(value = "/finance/tmcPayRecord", method = RequestMethod.GET)
    public String tmcPayRecord(){
    	return "/finance/tmcPayRecord";
    }


    /**************账户资金***********************/
    @RequestMapping(value = "/capital/flow/flight")
    public String capitalFlowFlight() {
        return "/capital/capitalFlowFlight";
    }

    @RequestMapping(value = "/capital/flow/intl/flight")
    public String capitalFlowIntlFlight(){
        return "/capital/capitalFlowIntlFlight";
    }

    @RequestMapping(value = "/capital/flow/hotel")
    public String capitalFlowHotel() {
        return "/capital/capitalFlowHotel";
    }

    @RequestMapping(value = "/capital/flow/train")
    public String capitalFlowTrain() {
        return "/capital/capitalFlowTrain";
    }

    @RequestMapping(value = "/capital/flow/sms")
    public String capitalFlowSms() {
        return "/capital/capitalFlowSms";
    }
    @RequestMapping(value = "/capital/accountRecharge")
    public String accountRecharge() {
        return "/capital/accountRecharge";
    }

    /**************国际机票相关***********************/
    @RequestMapping(value="/order/internationalPnrImport")
    public String internationalPnrImport(){
        return "/order/internationalPnrImport";
    }
    @RequestMapping(value="/order/internationalFlightList")
    public String internationalFlightList(){
        return "/order/internationalFlightList";
    }
    @RequestMapping(value="/order/internationalFlightDetail")
    public String internationalFlightDetail(){
        return "/order/internationalFlightDetail";
    }
    @RequestMapping(value="/corp/internationalCorpActivity")
    public String internationalCorpActivity(){
        return "/corp/internationalCorpActivity";
    }

    /***************** 保险商城 ************************/
    @RequestMapping(value = "/insurance/index")
    public String insuranceIndex(){return "/insurance/index";}

    @RequestMapping(value = "/insurance/orderSubmit")
    public String insuranceOrderSubmit(){return "/insurance/insuranceOrderSubmit";}

    @RequestMapping(value = "/insurance/orderDetail")
    public String insuranceOrderDetail(){return "/insurance/insuranceOrderDetail";}

    @RequestMapping(value = "/insurance/orderList")
    public String insuranceOrderList(){return "/insurance/insuranceOrderList";}

    @RequestMapping(value = "/insurance/formList")
    public String insuranceFormList(){return "/insurance/insuranceFormList";}

    @RequestMapping(value = "/insurance/orderFinish")
    public String insuranceOrderFinish(){return "/insurance/insuranceOrderFinish";}

    @RequestMapping(value = "/insurance/announcement")
    public String insuranceAnouncement(){return "/insurance/announcement";}

    @RequestMapping(value = "/finance/insuranceSettlement")
    public String insuranceSettlement() {
        return "/finance/insuranceSettlement";
    }
}
