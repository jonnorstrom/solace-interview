import { GET } from "./route";
import { AdvocatesResponse } from "./AdvocatesResponse";
import { Advocate } from "../../interfaces";

describe("GET /api/advocates", () => {
  it("should return a successful response", async () => {
    const response = await GET();

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
  });

  it("should return all advocates", async () => {
    const response = await GET();
    const json: AdvocatesResponse = await response.json();

    expect(json.data).toBeDefined();
    expect(Array.isArray(json.data)).toBe(true);
    expect(json.data.length).toBe(15); // Based on local seeds - flimsy test
  });

  it("should return advocates with correct data structure", async () => {
    const response = await GET();
    const json: AdvocatesResponse = await response.json();
    const advocate: Advocate = json.data[0];

    expect(typeof advocate.id).toBe('number');
    expect(typeof advocate.firstName).toBe('string');
    expect(typeof advocate.lastName).toBe('string');
    expect(typeof advocate.city).toBe('string');
    expect(typeof advocate.degree).toBe('string');
    expect(Array.isArray(advocate.specialties)).toBe(true);
    expect(typeof advocate.yearsOfExperience).toBe('number');
    expect(typeof advocate.phoneNumber).toBe('number');
    expect(advocate.createdAt).toBeDefined();
  });
});

