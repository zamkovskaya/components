import React from 'react';

import {block} from '../utils/cn';

import {PlaceholderContainerAction} from './PlaceholderContainerAction';
import {Align, Direction, componentClassName} from './constants';
import {
    PlaceholderContainerDefaultProps,
    PlaceholderContainerImageSettingsProps,
    PlaceholderContainerInnerProps,
    PlaceholderContainerState,
} from './types';

import './PlaceholderContainer.scss';

const b = block(componentClassName);

export class PlaceholderContainer extends React.Component<
    PlaceholderContainerInnerProps,
    PlaceholderContainerState
> {
    static Direction = Direction;
    static Align = Align;

    static defaultProps: PlaceholderContainerDefaultProps = {
        size: 'l',
        direction: Direction.Row,
        align: Align.Center,
    };

    render() {
        const {direction, align, size} = this.props;
        const className: string = this.props.className || b();

        return (
            <div className={b({direction, align, size}, [className])}>
                <div className={b('body')}>
                    <div className={b('image', {size})}>{this.renderImage()}</div>
                    {this.renderContent()}
                </div>
            </div>
        );
    }

    private renderImage(): NonNullable<React.ReactNode> {
        if (typeof this.props.image === 'object' && 'url' in this.props.image) {
            const image: PlaceholderContainerImageSettingsProps = this.props.image;
            return <img src={image.url} alt={image.alt || ''} />;
        }

        return this.props.image;
    }

    private renderContent() {
        const {size} = this.props;
        const content = this.props.renderContent ? (
            this.props.renderContent()
        ) : (
            <>
                {this.renderTitle()}
                {this.renderDescription()}
            </>
        );

        return (
            <div className={b('content', {size})}>
                {content}
                {this.renderAction()}
            </div>
        );
    }

    private renderTitle() {
        const {title} = this.props;

        if (!title) {
            return null;
        }

        return <div className={b('title')}>{title}</div>;
    }

    private renderDescription() {
        const {description} = this.props;

        if (!description) {
            return null;
        }

        return <div className={b('description')}>{description}</div>;
    }

    private renderAction() {
        const {action, renderAction} = this.props;

        if (renderAction) {
            return renderAction();
        }

        if (!action) {
            return null;
        }

        if (Array.isArray(action)) {
            if (!action.length) {
                return null;
            }

            return (
                <div className={b('actions')}>
                    {action.map((actionItem) => (
                        <PlaceholderContainerAction key={actionItem.text} action={actionItem} />
                    ))}
                </div>
            );
        }

        return (
            <div className={b('actions')}>
                <PlaceholderContainerAction action={action} />
            </div>
        );
    }
}
