#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import "RNSplashScreen.h"
#import <CodePush/CodePush.h>
#import <React/RCTLinkingManager.h>
#import "WXApi.h"

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, WXApiDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
