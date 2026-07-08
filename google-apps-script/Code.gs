/**
 * 라이프해킹 채용 지원서 → 구글시트 자동 수집 스크립트
 *
 * 설치 방법은 이 폴더의 README.md를 참고하세요.
 * 이 파일은 참고용 사본입니다 — 실제 실행은 script.google.com 에 붙여넣은
 * 코드에서 이뤄집니다(이 저장소 코드가 자동으로 배포되지 않습니다).
 */

var SHEET_NAME = "지원자";
var DRIVE_FOLDER_NAME = "라이프해킹 채용 지원서";

var HEADER_ROW = [
  "제출일시",
  "지원직무",
  "이름",
  "이메일",
  "연락처",
  "1. 지원 이유",
  "2. 주요 성과·경험",
  "3. 이루고 싶은 목표",
  "포트폴리오 링크",
  "이력서·자기소개서",
  "경력기술서",
  "포트폴리오 파일",
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var sheet = getOrCreateSheet_();
    var folder = getOrCreateFolder_(DRIVE_FOLDER_NAME);

    var resumeUrl = data.resume ? saveFile_(folder, data.resume, data.name, "이력서") : "";
    var careerUrl = data.career ? saveFile_(folder, data.career, data.name, "경력기술서") : "";
    var portfolioUrl = data.portfolio ? saveFile_(folder, data.portfolio, data.name, "포트폴리오") : "";

    sheet.appendRow([
      new Date(),
      data.role || "",
      data.name || "",
      data.email || "",
      data.phone || "",
      data.q1 || "",
      data.q2 || "",
      data.q3 || "",
      data.portfolioLink || "",
      resumeUrl,
      careerUrl,
      portfolioUrl,
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADER_ROW);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getOrCreateFolder_(name) {
  var folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(name);
}

// fileObj = { name: string, mimeType: string, base64: string }
function saveFile_(folder, fileObj, applicantName, label) {
  var bytes = Utilities.base64Decode(fileObj.base64);
  var blob = Utilities.newBlob(bytes, fileObj.mimeType, fileObj.name);
  var fileName = applicantName + "_" + label + "_" + fileObj.name;
  var file = folder.createFile(blob).setName(fileName);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}
