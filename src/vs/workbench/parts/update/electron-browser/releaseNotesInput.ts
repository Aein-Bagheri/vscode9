/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import { localize } from 'vs/nls';
import { TPromise } from 'vs/base/common/winjs.base';
import { EditorInput } from 'vs/workbench/common/editor';
import URI from 'vs/base/common/uri';

export class ReleaseNotesInput extends EditorInput {

	static ID = 'workbench.releaseNotes.input';

	get version(): string { return this._version; }
	get text(): string { return this._text; }

	constructor(private _version: string, private _text: string) {
		super();
	}

	getResource(): URI {
		return URI.from({ scheme: 'release-notes', path: `${this._version}.release-notes` });
	}

	getTypeId(): string {
		return ReleaseNotesInput.ID;
	}

	getName(): string {
		return localize('releaseNotesInputName', "Release Notes: {0}", this.version);
	}

	matches(other: any): boolean {
		if (!(other instanceof ReleaseNotesInput)) {
			return false;
		}

		const otherInput = other as ReleaseNotesInput;
		return this.version === otherInput.version;
	}

	resolve(refresh?: boolean): TPromise<any> {
		return TPromise.as(null);
	}

	supportsSplitEditor(): boolean {
		return false;
	}
}