
import * as vscode from "vscode";
import { SelfProfileAPI } from "../const/URL";
import { IProfile } from "../model/target/target";
import { HttpService } from "./http.service";
import { AccountService } from "./account.service";

export class ProfileService {
	public profile: IProfile;

	constructor (protected context: vscode.ExtensionContext, 
		protected httpService: HttpService,
		protected accountService: AccountService) {
	}

	public async fetchProfile() {
		if(await this.accountService.isAuthenticated()) {
			this.profile  = await this.httpService.sendRequest({
				uri: SelfProfileAPI,
				json: true
			});	
		} else {
			this.profile = undefined;
		}
	}

	get name(): string {
		// this.fetchProfile();
		return this.profile ? this.profile.name : undefined;
	}

	get headline(): string {
		return this.profile ? this.profile.headline : undefined;
	}

	get avatarUrl(): string {
		return this.profile ? this.profile.avatar_url : undefined;
	}
}