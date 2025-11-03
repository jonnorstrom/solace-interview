import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";


global.fetch = jest.fn();

describe("Home Page - Search Functionality", () => {
  const mockAdvocates = [
    {
      firstName: "John",
      lastName: "Doe",
      city: "New York",
      degree: "MSW",
      specialties: ["Anxiety", "Depression"],
      yearsOfExperience: "5",
      phoneNumber: 5551234567,
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      city: "Los Angeles",
      degree: "PhD",
      specialties: ["Trauma", "PTSD"],
      yearsOfExperience: "10",
      phoneNumber: 5559876543,
    },
    {
      firstName: "Bob",
      lastName: "Johnson",
      city: "Chicago",
      degree: "LCSW",
      specialties: ["Family Therapy", "Depression"],
      yearsOfExperience: "7",
      phoneNumber: 5554567890,
    },
  ];

  beforeEach(() => {
    // Reset the mock before each test
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ data: mockAdvocates }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display all advocates initially", async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("should filter advocates by first name when typing in search bar", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId("search-input");

    await user.type(searchInput, "Jane");

    await waitFor(() => {
      expect(screen.getByText("Smith")).toBeInTheDocument();
      expect(screen.queryByText("Doe")).not.toBeInTheDocument();
      expect(screen.queryByText("Johnson")).not.toBeInTheDocument();
    });
  });

  it("should filter advocates by last name when typing in search bar", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId("search-input");

    await user.type(searchInput, "Johnson");

    await waitFor(() => {
      expect(screen.getByText("Bob")).toBeInTheDocument();
      expect(screen.queryByText("John")).not.toBeInTheDocument();
      expect(screen.queryByText("Jane")).not.toBeInTheDocument();
    });
  });

  it("should filter advocates by city when typing in search bar", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId("search-input");

    await user.type(searchInput, "Chicago");

    await waitFor(() => {
      expect(screen.getByText("Bob")).toBeInTheDocument();
      expect(screen.queryByText("John")).not.toBeInTheDocument();
      expect(screen.queryByText("Jane")).not.toBeInTheDocument();
    });
  });

  it("should filter advocates by degree when typing in search bar", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId("search-input");

    await user.type(searchInput, "PhD");

    await waitFor(() => {
      expect(screen.getByText("Jane")).toBeInTheDocument();
      expect(screen.queryByText("John")).not.toBeInTheDocument();
      expect(screen.queryByText("Bob")).not.toBeInTheDocument();
    });
  });

  it("should filter advocates by specialty when typing in search bar", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId("search-input");

    await user.type(searchInput, "Trauma");

    await waitFor(() => {
      expect(screen.getByText("Jane")).toBeInTheDocument();
      expect(screen.queryByText("John")).not.toBeInTheDocument();
      expect(screen.queryByText("Bob")).not.toBeInTheDocument();
    });
  });

  it("should filter advocates by years of experience when typing in search bar", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId("search-input");

    await user.type(searchInput, "10");

    await waitFor(() => {
      expect(screen.getByText("Jane")).toBeInTheDocument();
      expect(screen.queryByText("John")).not.toBeInTheDocument();
      expect(screen.queryByText("Bob")).not.toBeInTheDocument();
    });
  });

  it("should display search term in the 'Searching for' section", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId("search-input");

    await user.type(searchInput, "New York");

    // Check that the search term is displayed
    await waitFor(() => {
      expect(screen.getByText(/Searching for:/)).toBeInTheDocument();
    });
    
    // Verify the input value reflects the search term
    expect(searchInput).toHaveValue("New York");
  });

  it("should reset search and show all advocates when Reset button is clicked", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId("search-input");

    await user.type(searchInput, "Jane");

    await waitFor(() => {
      expect(screen.getByText("Smith")).toBeInTheDocument();
      expect(screen.queryByText("Doe")).not.toBeInTheDocument();
    });

    const resetButton = screen.getByRole("button", { name: /reset search/i });
    await user.click(resetButton);

    await waitFor(() => {
      expect(screen.getByText("Doe")).toBeInTheDocument();
      expect(screen.getByText("Smith")).toBeInTheDocument();
      expect(screen.getByText("Johnson")).toBeInTheDocument();
    });
  });

  it("should handle partial matches in search", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId("search-input");

    await user.type(searchInput, "Jo");

    // Both John and Bob Johnson should match
    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
      expect(screen.queryByText("Jane")).not.toBeInTheDocument();
    });
  });

  it("should be case-insensitive when searching", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId("search-input");

    await user.type(searchInput, "jane");

    await waitFor(() => {
      expect(screen.getByText("Smith")).toBeInTheDocument();
      expect(screen.queryByText("Doe")).not.toBeInTheDocument();
      expect(screen.queryByText("Johnson")).not.toBeInTheDocument();
    });
  });

  it("should filter advocates by phone number when typing in search bar", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId("search-input");

    await user.type(searchInput, "9876");

    await waitFor(() => {
      expect(screen.getByText("Smith")).toBeInTheDocument();
      expect(screen.queryByText("Doe")).not.toBeInTheDocument();
      expect(screen.queryByText("Johnson")).not.toBeInTheDocument();
    });
  });

  it("should display loading state while fetching advocates", async () => {
    (global.fetch as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              json: async () => ({ data: mockAdvocates }),
            });
          }, 100);
        })
    );

    render(<Home />);

    expect(screen.getByText("Loading advocates...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    expect(screen.queryByText("Loading advocates...")).not.toBeInTheDocument();
  });

  it("should display 'No results found' message when search returns no matches", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId("search-input");

    await user.type(searchInput, "NonExistentName");

    await waitFor(() => {
      expect(screen.getByText("No results found")).toBeInTheDocument();
      expect(screen.getByText("Try adjusting your search terms to find what you're looking for.")).toBeInTheDocument();
    });

    expect(screen.queryByText("John")).not.toBeInTheDocument();
    expect(screen.queryByText("Jane")).not.toBeInTheDocument();
    expect(screen.queryByText("Bob")).not.toBeInTheDocument();
  });

  it("should hide no results message when advocates are found again", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId("search-input");

    await user.type(searchInput, "NonExistentName");

    await waitFor(() => {
      expect(screen.getByText("No results found")).toBeInTheDocument();
    });

    await user.clear(searchInput);

    await waitFor(() => {
      expect(screen.queryByText("No results found")).not.toBeInTheDocument();
      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("Jane")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
    });
  });
});
