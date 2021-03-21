Feature: User Creates an account

Scenario: User can create an account
Given I am on Homepage
When I click on "Sign in" link
Then I am on "Authentication" page
Then I set "email_create" input with "bbsdfdasdss@test.com" value
When I click over "SubmitCreate" button
Then I validate "account-creation_form" form is displayed
Then I am on "Create an account" page
Then I check option "Mr." from Title
Then I set "customer_firstname" input with "auto" value
Then I set "customer_lastname" input with "test" value
Then I validate "email" input contains "bbsdfdasdss@test.com" value
Then I set "passwd" input with "testpass" value
Then I click "days" options and select "3" position
Then I click "months" options and select "September" value
Then I click "years" options and select "1984" value
Then I validate "firstname" input contains "auto" value
Then I validate "lastname" input contains "test" value
Then I set "address1" input with "Cl 50 # 50a - 20" value
Then I set "city" input with "copacabana" value
Then I click "id_state" options and select "Florida" value
Then I set "postcode" input with "33010" value
Then I validate "id_country" input contains "21" value
Then I set "phone_mobile" input with "9991112233" value
Then I set "alias" input with "testalias" value
When I click over "submitAccount" button
Then I validate "My personal information" link is displayed
Then I am on "My account" page
When I click on "Sign out" link
Then I am on "Authentication" page

Scenario: User can log in account
Given I have a valid account
When I click on "Sign in" link
Then I am on "Authentication" page
Then I set "email" input with "bbsdfdasdss@test.com" value
Then I set "passwd" input with "testpass" value
When I click over "SubmitLogin" button
Then I validate "My personal information" link is displayed
Then I am on "My account" page
Then I validate "auto test" user created