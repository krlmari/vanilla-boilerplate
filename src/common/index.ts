import barba, { IViewData } from '@barba/core';

// Styles
import '@common/scss/globals.scss';

import views from '@common/views';
import { findComponent } from '@common/utils';

// Common components
import Header from '@components/header/header';

barba.init({
    views,
});

let header: Header;

barba.hooks.afterEnter((data: IViewData) => {
    if (!header) {
        header = new Header({ ...findComponent('header'), data });
    } else {
        header.updateActiveLink(data);
    }
});
