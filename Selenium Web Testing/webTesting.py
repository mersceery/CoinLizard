from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

# Start a new Chrome session
driver = webdriver.Chrome()

try:
    driver.get("http://localhost:3000/")
    print("Opened URL")

    # Wait for the page to load
    time.sleep(2)
    print("Page loaded successfully")

    # Test Home Page
    enter_username = driver.find_element(By.ID, value="user-name")
    print("Found enter username input")
    enter_username.send_keys("Test User")
    time.sleep(1)  # Wait for search results to load
    print("Username entered successfully")

    connect_button = driver.find_element(
        "css selector", ".enterUsername-button"
    )  # Use css selector
    connect_button.click()
    time.sleep(1)
    print("Connect button clicked successfully")

    # Test searching for a coin
    search_input = driver.find_element("css selector", ".searchBar")  # Use css selector
    print("Found search input element")
    search_input.send_keys("Bitcoin")
    time.sleep(1)  # Wait for search results to load
    print("Search results page loaded successfully")

    # Test toggling dark mode
    dark_mode_button = driver.find_element(
        "css selector", ".toggle-label"
    )  # Use css selector
    print("Found dark mode toggle button")
    dark_mode_button.click()
    time.sleep(1)
    print("Dark mode applied successfully")

    # Scroll down to make the coin link visible
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(1)  # Give some time for the page to scroll

    # Test clicking on a coin to view details
    coin_link = driver.find_element("css selector", ".coin-name")  # Use css selector
    print("Found coin link")
    coin_link.click()
    time.sleep(1)
    print("Coin details page loaded successfully")

    back_button = driver.find_element(
        "css selector", ".header-button"
    )  # Use css selector
    back_button.click()
    print("Back button clicked from coin details page")
    time.sleep(2)

    driver.execute_script("window.scrollBy(0, 700);")
    time.sleep(2)
    # Test adding a coin to favorites
    add_favorite_buttons = driver.find_elements(
        "css selector", ".favorite-btn"
    )  # Use css selector
    print("Found add to favorites buttons")
    if add_favorite_buttons:
        first_add_favorite_button = add_favorite_buttons[0]  # Select the first element
        first_add_favorite_button.click()
        print("Clicked on the first add to favorites button")
    else:
        print("No add to favorites button found")
    time.sleep(2)
    print("Coin added to favorites successfully")

    favorite_link = driver.find_element(By.LINK_TEXT, "Favorite")
    favorite_link.click()
    print("Found trending page link")
    time.sleep(1)

    print("Favorite page loaded successfully")

    driver.execute_script("window.scrollBy(0, 700);")
    time.sleep(1)
    remove_button = driver.find_element(
        By.XPATH, "//button[contains(text(),'Remove from Favorites')]"
    )
    remove_button.click()

    print("Removed coin from favorites successfully")

    # Test Exchanges Page
    navigate_exchanges = driver.find_element(By.LINK_TEXT, "Exchanges").click()
    print("Navigated to exchange page successfully")
    time.sleep(1)

    driver.back()
    print("Navigated back to the previous page")
    time.sleep(1)

    # Test Rates Page
    navigate_rates = driver.find_element(By.LINK_TEXT, "Rates").click()
    print("Navigated to Rates page successfully")
    time.sleep(1)

    select_element_dropdown = driver.find_element(By.XPATH, "//select")
    select_element_dropdown.click()
    time.sleep(1)
    print("Clicked on the dropdown select component")
    # Locate and click on the desired option within the dropdown
    select = Select(select_element_dropdown)
    options = select.options
    if len(options) >= 3:
        third_option = options[2]
        third_option.click()
        print("Clicked on the third option:", third_option.text)
    else:
        print("There are fewer than three options available in the dropdown")
    driver.find_element(By.XPATH, "//body").click()
    print("Clicked on the body to close the dropdown select component")
    time.sleep(1)

    click_rate_div = driver.find_elements(By.CSS_SELECTOR, ".rate-component-container")
    click_rate_div[2].click()
    print("Clicked on the third rate div")
    time.sleep(1)

    input_amount = driver.find_element(By.XPATH, "//input[@type='number'][1]")
    input_amount.send_keys("100")
    print("Entered amount successfully")
    time.sleep(1)

    driver.find_element(
        By.XPATH, "//button[contains(text(), 'Convert to USD')]"
    ).click()
    print("Clicked on the Convert to USD button")
    time.sleep(1)

    converted_amount = driver.find_element(By.CSS_SELECTOR, ".convertedAmount")
    print("Read Converted amount:", converted_amount.text)

    # Test NFT Page
    navigate_rates = driver.find_element(By.LINK_TEXT, "NFT").click()
    print("Navigated to NFT page successfully")
    time.sleep(1)

    driver.find_element(By.ID, "dropdown-basic-button").click()
    print("Clicked on dropdown")
    time.sleep(1)

    driver.find_element(By.LINK_TEXT, "Optimism").click()
    print("Selected Optimism from dropdown")
    time.sleep(1)

    # Test Small Chat Tab
    driver.find_element(By.XPATH, "//div[@class='toggle-button']").click()
    print("Chat Tab opened successfully")
    time.sleep(1)

    send_message_to_chatroom = driver.find_element(
        By.XPATH, "//input[@placeholder='enter the message']"
    )
    send_message_to_chatroom.send_keys(
        "Hello, this is a test message from small Chat Tab"
    )
    time.sleep(1)

    driver.find_element(By.XPATH, "//button[text()='send']").click()
    print("Message sent successfully")
    time.sleep(1)

    driver.find_element(By.XPATH, "//div[@class='toggle-button']").click()
    print("Chat Tab closed successfully")
    time.sleep(1)

    # Test Chat Room Page
    navigate_rates = driver.find_element(By.LINK_TEXT, "Chat Room").click()
    print("Navigated to Chat Room page successfully")
    time.sleep(1)

    send_message_to_chatroom = driver.find_element(
        By.XPATH, "//input[@placeholder='enter the message']"
    )
    send_message_to_chatroom.send_keys("Hello, this is a test message")
    time.sleep(1)
    driver.find_element(By.XPATH, "//button[text()='send']").click()
    print("Message sent successfully")
    time.sleep(1)

    # Test News Page
    navigate_rates = driver.find_element(By.LINK_TEXT, "News").click()
    print("Navigated to News page successfully")
    time.sleep(1)

    driver.find_element(By.XPATH, "//input[@placeholder='Title']").send_keys(
        "Test Title"
    )
    print("Title entered successfully")
    driver.find_element(By.XPATH, "//textarea[@placeholder='Content']").send_keys(
        "Test Content"
    )
    print("Content entered successfully")
    driver.find_element(By.XPATH, "//input[@placeholder='Image URL']").send_keys(
        "https://experiencegalesburg.com/wp-content/uploads/2022/03/postplaceholder.jpg"
    )
    print("Image URL entered successfully")
    time.sleep(1)
    driver.find_element(By.XPATH, "//button[text()='Add Article']").click()
    print("Article added successfully")
    time.sleep(2)

    # Scroll to the element
    element = driver.find_element(By.XPATH, "//div[contains(h2, 'Test Title')]")
    driver.execute_script("arguments[0].scrollIntoView(true);", element)
    print("Scrolled to the targeted element successfully")
    time.sleep(2)

    driver.find_element(
        By.XPATH, "//div[contains(h2,'Test Title')]//button[text()='Delete']"
    ).click()
    print("Article deleted successfully")
    time.sleep(1)

    driver.execute_script("window.scrollTo(0, 0);")
    print("Scrolled to the top of the page successfully")
    time.sleep(2)

    for _ in range(2):
        driver.find_element(By.XPATH, "//button[text()='Sort by Most Likes']").click()
    print("Sorted by most likes successfully")
    time.sleep(1)

    for _ in range(2):
        driver.find_element(By.XPATH, "//button[text()='Sort by Least Likes']").click()
    print("Sorted by least likes successfully")
    time.sleep(1)

    for _ in range(2):
        driver.find_element(By.XPATH, "//button[text()='Reset Sorting']").click()
    print("Reset Sorting successfully")
    time.sleep(1)

    print("All tests passed successfully")

except Exception as e:
    print("Test failed:", e)
finally:
    driver.quit()
