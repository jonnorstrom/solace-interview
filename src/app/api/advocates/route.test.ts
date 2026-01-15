import { GET } from "./route";
import { advocateData } from "../../../db/seed/advocates";

describe("GET /api/advocates", () => {
  it("should return a successful response", async () => {
    const response = await GET();

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
  });

  it("should return all advocates", async () => {
    const response = await GET();
    const json = await response.json();

    expect(json.data).toBeDefined();
    expect(Array.isArray(json.data)).toBe(true);
    expect(json.data.length).toBe(15); // Based on advocateData seed
  });

  it("should return advocates with correct data structure", async () => {
    const response = await GET();
    const json = await response.json();
    const advocate = json.data[0];

    // Check that each advocate has all required fields
    expect(advocate).toHaveProperty("firstName");
    expect(advocate).toHaveProperty("lastName");
    expect(advocate).toHaveProperty("city");
    expect(advocate).toHaveProperty("degree");
    expect(advocate).toHaveProperty("specialties");
    expect(advocate).toHaveProperty("yearsOfExperience");
    expect(advocate).toHaveProperty("phoneNumber");
  });

  it("should return advocates with correct data types", async () => {
    const response = await GET();
    const json = await response.json();
    const advocate = json.data[0];

    expect(typeof advocate.firstName).toBe("string");
    expect(typeof advocate.lastName).toBe("string");
    expect(typeof advocate.city).toBe("string");
    expect(typeof advocate.degree).toBe("string");
    expect(Array.isArray(advocate.specialties)).toBe(true);
    expect(typeof advocate.yearsOfExperience).toBe("number");
    expect(typeof advocate.phoneNumber).toBe("number");
  });

  it("should return all advocates from advocateData", async () => {
    const response = await GET();
    const json = await response.json();

    // Verify the response matches the seed data
    expect(json.data).toEqual(advocateData);
  });

  it("should have valid degree values", async () => {
    const response = await GET();
    const json = await response.json();

    const validDegrees = ["MD", "PhD", "MSW"];

    json.data.forEach((advocate: any) => {
      expect(validDegrees).toContain(advocate.degree);
    });
  });

  it("should have non-empty specialties array for each advocate", async () => {
    const response = await GET();
    const json = await response.json();

    json.data.forEach((advocate: any) => {
      expect(advocate.specialties.length).toBeGreaterThan(0);
      advocate.specialties.forEach((specialty: any) => {
        expect(typeof specialty).toBe("string");
        expect(specialty.length).toBeGreaterThan(0);
      });
    });
  });

  it("should have valid years of experience (positive numbers)", async () => {
    const response = await GET();
    const json = await response.json();

    json.data.forEach((advocate: any) => {
      expect(advocate.yearsOfExperience).toBeGreaterThan(0);
      expect(advocate.yearsOfExperience).toBeLessThanOrEqual(50); // Reasonable max
    });
  });

  it("should have valid phone numbers (10 digits)", async () => {
    const response = await GET();
    const json = await response.json();

    json.data.forEach((advocate: any) => {
      const phoneString = String(advocate.phoneNumber);
      expect(phoneString.length).toBe(10);
    });
  });

  it("should return specific advocates by name", async () => {
    const response = await GET();
    const json = await response.json();

    // Check for specific advocates from seed data
    const johnDoe = json.data.find(
      (a: any) => a.firstName === "John" && a.lastName === "Doe"
    );
    const janeSmith = json.data.find(
      (a: any) => a.firstName === "Jane" && a.lastName === "Smith"
    );

    expect(johnDoe).toBeDefined();
    expect(johnDoe.city).toBe("New York");
    expect(johnDoe.degree).toBe("MD");

    expect(janeSmith).toBeDefined();
    expect(janeSmith.city).toBe("Los Angeles");
    expect(janeSmith.degree).toBe("PhD");
  });
});

