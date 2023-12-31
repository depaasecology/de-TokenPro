//
//  PagingViewContainer.h
// test12
//
//  Created by 林雷钦 on 2022/7/18.
//

#import <React/RCTView.h>
#import "JXPagerView.h"
#import <React/RCTScrollView.h>

NS_ASSUME_NONNULL_BEGIN

@interface PagingViewContainer : RCTView<JXPagerViewListViewDelegate>
@property (nonatomic, weak) RCTScrollView *reactScrollView;
-(instancetype)initWithReactView:(UIView *)reactView;

@end

NS_ASSUME_NONNULL_END
