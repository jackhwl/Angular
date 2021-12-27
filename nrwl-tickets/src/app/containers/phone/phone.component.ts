import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "vi-phone",
  templateUrl: "./phone.component.html",
  styleUrls: ["./phone.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhoneComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
