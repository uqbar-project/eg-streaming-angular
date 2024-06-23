import { ComponentFixture } from "@angular/core/testing"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getByDataTestId = (fixture: ComponentFixture<any>, testid: string): any => {
  return fixture.nativeElement.querySelector(`[data-testid="${testid}"]`)
}
