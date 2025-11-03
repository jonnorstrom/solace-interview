## Future enhancements (in order of importance, in my opinion)

###### Loading Advocates in async
This app, currently, loads all the Advocates from the DB into the frontend - which is fine when you only have 15 records. Not fine when you have hundreds of thousands.

I would update the main advocates api endpoint to accept a filter phrase (which would be blank on page-load), as well as a page number (I'd hardcode the page capacity on a first pass) so that it can return only what the frontend needs, rather than all the records at once.

I'd update the filter input to implement debouncing so that we aren't making api calls for every key stroke, only after the user has stopped typing. When the filter keyword changes, the pagination data should get set back to page 1 as well.

This way we're only ever loading a small-ish number of Advocates at a time and only loading new ones when the user wants to see new ones (either by paging through or by changing the search term)

_**TL;DR** - I'd want to dedicate a good amount of time really optimizing between usability and only pulling what's needed at the time it's needed. I chose not to do that now because I could easily see myself spending too much time on it and not getting around to other things._

###### DB Schema Changes
The first thing I'd change with the schema is that I'd create a Specialties table something like:

| Column Name | Data Type | Constraints |
|-------------|-----------|-------------|
| id          | INTEGER   | pk          |
| name        | STRING    | NOT NULL    |

And then a join table `advocate_specialties` so that all the Advocates can `have_many` specialties

| Column Name   | Data Type | Constraints      |
|---------------|-----------|------------------|
| id            | INTEGER   | pk               |
| advocate_id   | INTEGER   | fk, NOT NULL     |
| specialty_id  | INTEGER   | fk, NOT NULL     |

and then lastly, I would drop the specialties column from the advocates table. Honestly, you could do the same with the `degree` column as well (if you want to allow your advocates to have more than one degree, which feels realistic). This gets rid of data duplication and helps normalize the database (should be close to 3NF now).

_Technically_ keeping the city column in the advocates table would still be duplicating data.. but it's such a small field that maybe that's fine. Perhaps an argument could be made for an `advocates_contact_info` table which holds the phone number, city, outreach address. If advocates work out of an office or are part of a larger medical group, I could see a case where multiple advocates all share the same phone number and outreach address. If we think that would be the case, then adding that table and removing those columns would be next.

###### Mobile Formatting
"Mobile First" - the markup and CSS on this is not. But I don't think that just sqishing the table as the screen gets thinner is gonna work, so I'd spend some time coming up with a a mobile advocates table component which is probably shaped a little different, maybe hides some data to make room for the important parts. That should get rendered on smaller screens to make searching and scrolling through the table easier to use on smaller devices like phones or tablets.

###### High-vis mode
It's seems reasonable to think that some of the users of this search might have eyesight problems (partial blindness, color blindness) and so we could put a small toggle on the screen to enable a high-contrast or high-visibilty color scheme

###### Specialty click-to-search
I think it'd be cool to be able to click one of the specialty pills and have that fire off the new api call to filter by any advocates with that specialty.

###### Another pass at the test files
I kind of just dumped all my frontend tests into a single file to keep things moving along for this project. As the complexity increases, I'd want to separate those out and maybe build out some helper functions that each file can share.