// jest.mock("../config/firebase", () => require("../__mocks__/firebase"));

// const { createReport } = require("../services/reportService");
// const firebase = require("../config/firebase");

// describe("Report Service", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should create a report and return the report ID", async () => {
//     const reportData = {
//       data: ["data1", "data2"],
//       status: "success",
//       description: "description",
//       location: "location",
//       timeStamp: "timeStamp",
//       userId: "userId",
//     };

//     const expectedDocId = "reportId";
//     firebase
//       .firestore()
//       .collection()
//       .add.mockResolvedValue({ id: expectedDocId });

//     const result = await createReport(reportData);

//     expect(firebase.firestore().collection).toHaveBeenCalledWith("reports");
//     expect(firebase.firestore().collection().add).toHaveBeenCalledWith({
//       data: reportData.data,
//       status: reportData.status,
//       description: reportData.description,
//       location: reportData.location,
//       timeStamp: reportData.timeStamp,
//     });
//     expect(firebase.firestore().collection().doc).toHaveBeenCalledWith(
//       reportData.userId
//     );
//     expect(firebase.firestore().collection().doc().update).toHaveBeenCalledWith(
//       {
//         reportIds: firebase.firestore().FieldValue.arrayUnion(expectedDocId),
//       }
//     );
//     expect(result).toEqual({ id: expectedDocId });
//   });
// });
jest.mock("../config/firebase", () => require("../__mocks__/firebase"));

const firebase = require("../config/firebase");
const {
  createReport,
  getAllReports,
  getReportIdsByUserId,
  getReportById,
  deleteReport,
} = require("../services/reportService");

describe("Report Services", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  describe("createReport", () => {
    it("should create a report and return the report ID", async () => {
      firebase
        .firestore()
        .collection()
        .add.mockResolvedValue({ id: "report123" });

      const data = {
        data: { data: [], status: "pending" },
        description: "Test report",
        location: "Test location",
        timeStamp: "2024-10-14T12:00:00Z",
        userId: "user123",
      };

      const { id } = await createReport(data);

      expect(firebase.firestore().collection).toHaveBeenCalledWith("reports");
      expect(firebase.firestore().collection().add).toHaveBeenCalledWith(
        expect.objectContaining({
          status: "pending",
          description: "Test report",
        })
      );
      expect(firebase.firestore().collection().doc).toHaveBeenCalledWith(
        "user123"
      );
      expect(
        firebase.firestore().collection().doc().update
      ).toHaveBeenCalledWith({
        reportIds: firebase.firestore.FieldValue.arrayUnion(),
      });
      expect(result).toEqual({ id: "report123" });
    });
  });

  describe("getAllReports", () => {
    it("should return all reports", async () => {
      const mockSnapshot = {
        forEach: (callback) =>
          callback({ id: "1", data: () => ({ title: "Report 1" }) }),
      };
      firebase.firestore().collection().get.mockResolvedValue(mockSnapshot);

      const reports = await getAllReports();

      expect(firebase.firestore().collection).toHaveBeenCalledWith("reports");
      expect(reports).toEqual([{ id: "1", title: "Report 1" }]);
    });
  });

  describe("getReportIdsByUserId", () => {
    it("should return report IDs for a given user", async () => {
      firebase
        .firestore()
        .collection()
        .doc()
        .get.mockResolvedValue({
          data: () => ({ reportIds: ["report1", "report2"] }),
        });

      const reportIds = await getReportIdsByUserId("user123");

      expect(firebase.firestore().collection).toHaveBeenCalledWith("users");
      expect(reportIds).toEqual(["report1", "report2"]);
    });
  });

  describe("getReportById", () => {
    it("should return a report by ID", async () => {
      firebase
        .firestore()
        .collection()
        .doc()
        .get.mockResolvedValue({
          id: "report123",
          data: () => ({ title: "Test Report" }),
        });

      const report = await getReportById("report123");

      expect(firebase.firestore().collection).toHaveBeenCalledWith("reports");
      expect(report).toEqual({ id: "report123", title: "Test Report" });
    });
  });

  describe("deleteReport", () => {
    it("should delete a report and remove associated images", async () => {
      // Mock user query to return a user with the report ID
      firebase
        .firestore()
        .collection()
        .where()
        .get.mockResolvedValue({
          forEach: (callback) =>
            callback({
              id: "user123",
              ref: { update: firebase.firestore().collection().doc().update },
            }),
        });

      // Mock report data retrieval
      firebase
        .firestore()
        .collection()
        .doc()
        .get.mockResolvedValueOnce({
          data: () => ({
            data: [{ image_url: "http://example.com/images/test.jpg" }],
          }),
        })
        .mockResolvedValueOnce({ data: () => ({ name: "John Doe" }) });

      await deleteReport("report123");

      expect(firebase.firestore().collection).toHaveBeenCalledWith("reports");
      expect(firebase.firestore().collection().doc).toHaveBeenCalledWith(
        "report123"
      );
      expect(firebase.storage().bucket().file).toHaveBeenCalledWith(
        "images/John Doe_user123/test.jpg"
      );
      expect(firebase.storage().bucket().file().delete).toHaveBeenCalled();
      expect(firebase.firestore().collection().doc().delete).toHaveBeenCalled();
    });
  });
});
