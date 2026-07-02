const axios = require("axios");
const cheerio = require("cheerio");

async function scraper(vehicleNo) {
    const page = await axios.get(
        "https://khanansoft.bihar.gov.in/portal/ePass/ViewPassDetailsNew.aspx",
        {
            timeout: 15000,
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        }
    );

    const $ = cheerio.load(page.data);

    const viewState = $("#__VIEWSTATE").val();
    const generator = $("#__VIEWSTATEGENERATOR").val();
    const encrypted = $("#__VIEWSTATEENCRYPTED").val() || "";

    const form = new URLSearchParams();

    form.append("__EVENTTARGET", "");
    form.append("__EVENTARGUMENT", "");
    form.append("__VIEWSTATE", viewState);
    form.append("__VIEWSTATEGENERATOR", generator);
    form.append("__VIEWSTATEENCRYPTED", encrypted);
    form.append("ddlfinancialyear", "2026-2027");
    form.append("txtchallanno", "");
    form.append("txtVehicleNo", vehicleNo);
    form.append("btnsearch", "Search");
    form.append("hndid", "0");

    const response = await axios.post(
        "https://khanansoft.bihar.gov.in/portal/ePass/ViewPassDetailsNew.aspx",
        form.toString(),
        {
            timeout: 15000,
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded",
                "User-Agent": "Mozilla/5.0",
                "Origin":
                    "https://khanansoft.bihar.gov.in",
                "Referer":
                    "https://khanansoft.bihar.gov.in/portal/ePass/ViewPassDetailsNew.aspx"
            }
        }
    );

    const $$ = cheerio.load(response.data);

    const result = {
        challanNo: $$("#lblchallanno").text().trim(),
        uidNo: $$("#lblUIDNo").text().trim(),
        challanDate: $$("#lblchallandate").text().trim(),
        validity: $$("#lblChallanValidity").text().trim(),
        consignerName: $$("#lblconsignername").text().trim(),
        location: $$("#lbllocation").text().trim(),
        destination: $$("#lbldestination").text().trim(),
        vehicleType: $$("#lblVehicleType").text().trim(),
        vehicleNo: $$("#lblvehicleno").text().trim(),
        mineral: $$("#lblmineralname").text().trim(),
        quantity: $$("#lblquantity").text().trim(),
        consigneeName: $$("#lblconsigneename").text().trim()
    };

    if (!result.challanNo) {
        throw new Error("Vehicle not found");
    }

    return result;
}

module.exports = scraper;