// eslint-disable-next-line import/no-extraneous-dependencies
import clsx from 'clsx';
import _ from 'lodash';
import { AbstractReactComponentProps } from '../types';

export const getRootClassName = (
    classes: AbstractReactComponentProps['classes'],
    className: AbstractReactComponentProps['className']
): string | undefined => {
    return clsx(_.get(classes, 'root'), className);
};
