import React, { useEffect } from 'react'
import Button from './Button'


export default function Storetool() {
    const [storeUrl, setStoreUrl] = React.useState(localStorage.getItem('shop_url') || null)
    console.log("storeUrl____", storeUrl)
    const sendStoreToWorker = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: () => {
                    const userFromLocalStorage = localStorage.getItem('user');
                    const storeUrlFromLocalStorage = (JSON.parse(userFromLocalStorage))?.shop_url
                    console.log("storeUrlFromLocalStorage", storeUrlFromLocalStorage)
                    return storeUrlFromLocalStorage; // This runs in the page context
                },
            }, (results) => {
                if (results && results[0] && results[0].result) {
                    const storeUrl = results[0].result;

                    // Send to background worker
                    chrome.runtime.sendMessage({ type: "STORE_URL", payload: storeUrl });
                } else {
                    console.warn("No store_url found in localStorage.");
                }
            });
        });

    }

    const alertClientToGoTo = ({ admin = false, url = "cms" }) => {
        let executeScript 
        switch (url) {
            case "cms":
                if(admin) {
                    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                        chrome.scripting.executeScript({
                            target: { tabId: tabs[0].id },
                            func: (() => {
                                const user = localStorage.getItem('user');
                                const storeUrl = (JSON.parse(user))?.shop_url
                                const response = confirm("Visit: "+ storeUrl + "/admin");
                                if (response && storeUrl) {
                                   
                                        window.open("https://" + storeUrl + "/admin", '_blank');
                                    
                                } 
                                return storeUrl;
                            }),
                        });
                    });
                
            } else {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        func: (() => {
                            const user = localStorage.getItem('user');
                            const storeUrl = (JSON.parse(user))?.shop_url
                            const response = confirm("Visit: "+ storeUrl + "/");
                            if (response && storeUrl) {
                               
                                    window.open("https://" + storeUrl + "/", '_blank');
                                
                            } 
                            return storeUrl;
                        }),
                    });
                });
            }
                break;
            case "partner-devsnest":
                {
                    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                        chrome.scripting.executeScript({
                            target: { tabId: tabs[0].id },
                            func: (() => {
                                const user = localStorage.getItem('user');
                                const storeUrl = (JSON.parse(user))?.shop_url
                                const response = confirm("Visit: "+"https://partners.shopify.com/715000/");
                                if (response && storeUrl) {
                                   
                                        window.open("https://partners.shopify.com/715000/", '_blank');
                                    
                                } 
                                return storeUrl;
                            }),
                        });
                    });
                }
                break;
                case "partner-ecom":
                    {
                        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                            chrome.scripting.executeScript({
                                target: { tabId: tabs[0].id },
                                func: (() => {
                                    const user = localStorage.getItem('user');
                                    const storeUrl = (JSON.parse(user))?.shop_url
                                    const response = confirm("Visit: "+"https://partners.shopify.com/2145786");
                                    if (response && storeUrl) {
                                       
                                            window.open("https://partners.shopify.com/2145786", '_blank');
                                        
                                    } 
                                    return storeUrl;
                                }),
                            });
                        });
                    }
                    break;
            default:
               
                break;
        }
        
    }
    const recieveMessages = () => {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.type === "STORE_URL") {
                console.log("Received store_url in background:", message.payload);
                const storeUrl = message.payload;
                console.log("Received store_url in background:", storeUrl);
                setStoreUrl(storeUrl);

                // You can now process, store, or use this value however you like.
            }
            console.log("runtime.onMessage", message);
        });

    }
    useEffect(() => {
        setTimeout(() => {
            sendStoreToWorker();
        }
            , 1000)
        console.log("i am here")

    }
        , [])
    useEffect(() => {
        // recieveMessages();
    }, [])
    return (
        <div className='flex flex-col gap-1 justify-center align-middle'>
            <Button onClick={() => {
                alertClientToGoTo({admin: false});

            }}>{`Visit Store`}</Button>
            <Button onClick={() => {
                alertClientToGoTo({admin:true, });

            }}>Visit Shopify Admin</Button>
            <Button onClick={() => {
                alertClientToGoTo({admin:false, url: "partner-devsnest"});

            }}>Visit Partner Devsnest</Button>
            <Button onClick={() => {
                alertClientToGoTo({admin:false, url: "partner-ecom"});

            }}>Visit Partner Ecompropeller</Button>
        </div>
    )
}
