import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatBotTab } from './chatBot-tab.page';

describe('ChatBotTab', () => {
  let component: ChatBotTab;
  let fixture: ComponentFixture<ChatBotTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatBotTab],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatBotTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
